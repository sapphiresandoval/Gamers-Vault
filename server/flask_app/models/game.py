from flask_app import app
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session
import re
from flask_bcrypt import Bcrypt
from flask_app.models import user

bcrypt = Bcrypt(app)
# The above is used when we do login registration, flask-bcrypt should already be in your env check the pipfile

# Remember 'fat models, skinny controllers' more logic should go in here rather than in your controller.


class Game:
    db = "gamers_vault"  # which database are you using for this project

    def __init__(self, data):
        self.id = data["id"]
        self.username = data["username"]
        self.email = data["email"]
        self.password = data["password"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.user_id = data["user_id"]
        self.creator = None
        # What changes need to be made above for this project?
        # What needs to be added here for class association?

    # Create Models

    # Read Models

    # Update Models

    # Delete Models
