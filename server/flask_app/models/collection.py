from flask_app import app
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session
import re
from flask_bcrypt import Bcrypt
from flask_app.models import user, game

bcrypt = Bcrypt(app)
# The above is used when we do login registration, flask-bcrypt should already be in your env check the pipfile

# Remember 'fat models, skinny controllers' more logic should go in here rather than in your controller.


class Collection:
    db = "gamers_vault"

    def __init__(self, data):
        self.id = data["id"]
        self.collection_name = data["collection_name"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.user_id = data["user_id"]
        self.game_id = data["game_id"]
        self.games = []
        self.user = None
        
    def to_dict_collection(self):
        return {
            "game": game.Game.to_dict(self.games),
            "id": self.id,
            "collection_name": self.collection_name,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user_id": self.user_id,
            "game_id": self.game_id,
        }

    @classmethod
    def create_collection(cls, data):
        query = """
            INSERT INTO collections (collection_name, game_id, user_id)
            VALUES (%(collection_name)s, %(game_id)s, %(user_id)s);
        """
        return connectToMySQL(cls.db).query_db(query, data)
    

    @classmethod
    def get_all_collections(cls):
        query = """
            SELECT * FROM collections
        """
        results = connectToMySQL(cls.db).query_db(query)
        collections = []
        for collection in results:
            collections.append(collection)
        return collections
    
    @classmethod
    def update_collection(cls, data):
        query = """
            UPDATE collections
            SET 
            collection_name = %(collection_name)s,
            user_id = %(user_id)s,
            game_id = %(game_id)s
            WHERE id = %(id)s;
        """
        return connectToMySQL(cls.db).query_db(query, data)

    # delete
    @classmethod
    def delete_collection(cls, id):
        query = """
            DELETE FROM collections
            WHERE id = %(id)s 
        """
        return connectToMySQL(cls.db).query_db(query, id)
    
    @classmethod
    def game_with_collections(cls, game_id):
        data = {"id": game_id}
        query = """
            SELECT games.*, collections.*, collection_maker.*, collection_user.*
            FROM games
            LEFT JOIN collections ON games.id = collections.game_id
            JOIN users AS collection_maker ON games.user_id = collection_maker.id
            LEFT JOIN users AS collection_user ON collections.user_id = collection_user.id
            WHERE games.id = %(id)s;
        """
        results = connectToMySQL(cls.db).query_db(query, data)

        if not results:
            return None  # Handle case where no results are found

        game_data = results[0]  # You might want to extract this into a Game object if needed
        this_game = {
            "id": game_data["id"],
            "name": game_data["name"],
            "genre": game_data["genre"],
            "description": game_data["description"],
            "collections": []  # Initialize collections
        }

        for db_row in results:
            if db_row["collections.id"] is not None:
                collection_obj = {
                    "id": db_row["collections.id"],
                    "collection_name": db_row["collections.collection_name"],
                    "user_id": db_row["collections.user_id"],
                    "game_id": db_row["game_id"],
                }
                if db_row["collection_user.id"] is not None:
                    collection_obj["user"] = {
                        "id": db_row["collection_user.id"],
                        "username": db_row["collection_user.username"],
                        "email": db_row["collection_user.email"],
                        "created_at": db_row["collection_user.created_at"],
                        "updated_at": db_row["collection_user.updated_at"],
                    }
                else:
                    collection_obj["user"] = None
                
                this_game["collections"].append(collection_obj)

        return this_game

    @classmethod
    def get_user_wish_list(cls, user_id):
        data = {"user_id": user_id}
        query = """
            SELECT games.*, collections.*
            FROM collections
            JOIN games ON collections.game_id = games.id
            WHERE collections.user_id = %(user_id)s AND collections.collection_name = 'wish';
        """
        results = connectToMySQL(cls.db).query_db(query, data)
        games = []
        for db_row in results:
            game_data = {
                "id": db_row["games.id"],
                "name": db_row["name"],
                "genre": db_row["genre"],
            }
            games.append(game_data)
        return games
