from flask_app import app
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import game
import re
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)
# The above is used when we do login registration, flask-bcrypt should already be in your env check the pipfile

# Remember 'fat models, skinny controllers' more logic should go in here rather than in your controller.


class Rating:
    db = "gamers_vault"  # which database are you using for this project

    def __init__(self, data):
        self.id = data["id"]
        self.number = data["number"]
        self.comment = data["comment"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.gamer = []
        # What changes need to be made above for this project?
        # What needs to be added here for class association?

    # Create Models
    @classmethod
    def create_rating(cls,data):
            query='''
                INSERT INTO ratings (number, comment, user_id)
                VALUES (%(number)s, %(comment)s, %(user_id)s);
            '''
            return  connectToMySQL(cls.db).query_db(query,data)

    # Read Models
    @classmethod
    def get_all_ratings(cls):
        query = """
            SELECT * FROM ratings;
        """
        results = connectToMySQL(cls.db).query_db(query)
        games = []
        for game in results:
            games.append(game)
        return games
    
    @classmethod
    def get_one_rating(cls, id):
        data = {"id": id}
        query = """
            SELECT * FROM ratings
            WHERE id = %(id)s;
        """
        results = connectToMySQL(cls.db).query_db(query, data)
        return cls(results[0])
    
    @classmethod
    def get_ratings_by_game(cls, game_id):
        data = {"game_id": game_id}
        query = '''
            SELECT * FROM ratings WHERE game_id = %(game_id)s;
        '''
        results = connectToMySQL(cls.db).query_db(query, data)
        return [cls(row) for row in results]
    
    @classmethod
    def game_ratings(cls):
        query = """
            SELECT * FROM ratings
            JOIN games
            ON ratings.game_id = games.id;
        """
        results = connectToMySQL(cls.db).query_db(query)
        ratings = []
        for db_row in results:
            rating = cls(db_row)
            game_data = {
                "id": db_row["games.id"],
                "name": db_row["name"],
                "genre": db_row["genre"],
                "platform": db_row["platform"],
                "how_its_owned": db_row["how_its_owned"],
                "list": db_row["list"],
                "created_at": db_row["created_at"],
                "updated_at": db_row["updated_at"]
            }
            game_obj = game.Game(game_data)
            rating.gamer = game_obj 
            ratings.append(rating)
        return ratings
    
    # Update Models
    @classmethod
    def update_rating(cls, data):
        query = """
            UPDATE ratings
            SET
            number = %(number)s,
            comment = %(comment)s,
            WHERE id = %(id)s;
        """
        return connectToMySQL(cls.db).query_db(query, data)

    # Delete Models
    @classmethod
    def delete_rating(cls, id):
        data = {"id": id}
        query = """
            DELETE FROM ratings
            WHERE id = %(id)s;
        """
        return connectToMySQL(cls.db).query_db(query, data)

    # Login Method

    # Validations
    @staticmethod
    def validate_rating(data):
        is_valid = True
        if data['number'] < 1 or data['number'] > 10:  
            flash("Rating must be between 1 and 10.", "rating")
            is_valid = False
        if len(data['comment']) > 255:
            flash("Comment cannot exceed 255 characters.", "comment")
            is_valid = False
        return is_valid
