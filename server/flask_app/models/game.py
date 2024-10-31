from flask_app import app
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session
import re
from flask_bcrypt import Bcrypt
from flask_app.models import user, collection

bcrypt = Bcrypt(app)
# The above is used when we do login registration, flask-bcrypt should already be in your env check the pipfile

# Remember 'fat models, skinny controllers' more logic should go in here rather than in your controller.


class Game:
    db = "gamers_vault"

    def __init__(self, data):
        self.id = data["id"]
        self.name = data["name"]
        self.genre = data["genre"]
        self.description = data["description"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.user_id = data["user_id"]
        self.collections = []
        self.ratings = []
        self.user = None

    def is_rated(self, user_id):
        for rating in self.ratings:
            if rating.user_id == user_id:
                return True
        return False

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "genre": self.genre,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user_id": self.user_id,
        }

    # Create Models
    @classmethod
    def create_game(cls, data):
        if Game.get_game_by_name(data["name"]):
            flash("Game Name exists already", "game")
            return False
        if not cls.validate_game(data):
            return False
        query = """
            INSERT INTO games (name, genre, description, user_id)
            VALUES (%(name)s, %(genre)s, %(description)s, %(user_id)s);
        """
        return connectToMySQL(cls.db).query_db(query, data)

    @classmethod
    def rating(cls, data):
        query = """
            INSERT INTO games (game_id, user_id, rating)
            VALUES (%(game_id)s, %(user_id)s, %(rating)s);
        """
        return connectToMySQL(cls.db).query_db(query, data)

    # Read Models
    @classmethod
    def get_all(cls):
        query = """
            SELECT * FROM games;
        """
        results = connectToMySQL(cls.db).query_db(query)
        users = []
        for user in results:
            users.append(user)
        return users

    @classmethod
    def get_one(cls, id):
        data = {"id": id}
        query = """
            SELECT * FROM games 
            WHERE id = %(id)s;
        """
        results = connectToMySQL(cls.db).query_db(query, data)
        return cls(results[0])

    @classmethod
    def get_game_by_name(cls, name):
        data = {"name": name}
        query = """
            SELECT * FROM games 
            WHERE name = %(name)s;
        """
        results = connectToMySQL(cls.db).query_db(query, data)
        if results:
            return cls(results[0])
        return False

    @classmethod
    def users_games(cls):
        query = """
            SELECT * FROM games
            JOIN users
            ON games.user_id = users.id;
        """
        results = connectToMySQL(cls.db).query_db(query)
        games = []
        for db_row in results:
            game = cls(db_row)
            user_data = {
                "id": db_row["users.id"],
                "username": db_row["username"],
                "email": db_row["email"],
                "password": db_row["password"],
                "created_at": db_row["users.created_at"],
                "updated_at": db_row["users.updated_at"],
            }
            user_obj = user.User(user_data)
            game.user = user_obj
            games.append(game)
        return games

    @classmethod
    def game_with_user_and_ratings(cls, id):
        data = {"id": id}
        query = """
            SELECT games.*, users.*, ratings.*, ROUND(AVG(ratings.rating),1) AS average_rating FROM games
            JOIN users
            ON games.user_id = users.id
            LEFT JOIN ratings
            ON games.id = ratings.game_id
            WHERE games.id = %(id)s
            GROUP BY games.id;
        """
        results = connectToMySQL(cls.db).query_db(query, data)
        games = []
        print(results)
        for db_row in results:
            game = cls(db_row)
            game.user = user.User(
                {
                    "id": db_row["users.id"],
                    "username": db_row["username"],
                    "email": db_row["email"],
                    "password": db_row["password"],
                    "created_at": db_row["users.created_at"],
                    "updated_at": db_row["users.updated_at"],
                }
            )

            game.ratings = db_row["average_rating"]
            games.append(game)
        return games


    # Update Models
    @classmethod
    def update(cls, data):
        query = """
            UPDATE games
            SET 
            name = %(name)s,
            genre = %(genre)s,
            description = %(description)s
            WHERE id = %(id)s;
        """
        return connectToMySQL(cls.db).query_db(query, data)

    # Delete Models
    @classmethod
    def delete(cls, id):
        data = {"id": id}
        query = """
            DELETE FROM games
            WHERE id = %(id)s;
        """
        return connectToMySQL(cls.db).query_db(query, data)

    # Validations
    @staticmethod
    def validate_game(data):
        is_valid = True
        if len(data["name"]) < 2:
            flash("Must be at least 2 characters.", "name")
            is_valid = False
        if len(data["genre"]) < 2:
            flash("Must be at least 2 characters.", "genre")
            is_valid = False
        if len(data["description"]) < 2:
            flash("Must be at least 2 characters.", "description")
            is_valid = False
        return is_valid
