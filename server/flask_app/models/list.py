from flask_app import app
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session
import re
from flask_bcrypt import Bcrypt
from flask_app.models import user

bcrypt = Bcrypt(app)
# The above is used when we do login registration, flask-bcrypt should already be in your env check the pipfile

# Remember 'fat models, skinny controllers' more logic should go in here rather than in your controller.


class List:
    db = "gamers_vault"

    def __init__(self, data):
        self.id = data["id"]
        self.list = data["list"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.user_id = data["user_id"]
        self.game_id = data["game_id"]
        self.user = None

    @classmethod
    def create_lists(cls, data):
        query = """
            INSERT INTO list (list, game_id, user_id)
            VALUES (%(list)s, %(game_id)s, %(user_id)s);
        """
        return connectToMySQL(cls.db).query_db(query, data)

    @classmethod
    def update_list(cls, data):
        query = """
            UPDATE list
            SET 
            list = %(list)s,
            user_id = %(user_id)s,
            game_id = %(game_id)s
            WHERE id = %(id)s;
        """
        return connectToMySQL(cls.db).query_db(query, data)

    # delete
    @classmethod
    def delete_list(cls, data):
        query = """
            DELETE FROM list 
            WHERE game_id = %(game_id)s 
            AND user_id = %(user_id)s;
        """
        return connectToMySQL(cls.db).query_db(query, data)
