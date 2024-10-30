from flask_app import app
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session
import re
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)
# The above is used when we do login registration, flask-bcrypt should already be in your env check the pipfile

# Remember 'fat models, skinny controllers' more logic should go in here rather than in your controller.


class User:
    db = "gamers_vault"  # which database are you using for this project

    def __init__(self, data):
        self.id = data["id"]
        self.username = data["username"]
        self.email = data["email"]
        self.password = data["password"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.games = []
        # What changes need to be made above for this project?
        # What needs to be added here for class association?

    # Create Models
    @classmethod
    def create(cls, user_data):
        if not cls.validate_user(user_data):
            return False
        user_data = (
            user_data.copy()
        )  # makes copy of user data so it is Mutable (changeable)
        user_data["password"] = bcrypt.generate_password_hash(user_data["password"])
        query = """
            INSERT INTO users (username, email, password)
            VALUES (%(username)s, %(email)s, %(password)s);
        """
        user_id = connectToMySQL(cls.db).query_db(query, user_data)
        session["user_id"] = user_id  # puts in session upon creation
        session["username"] = f"{user_data['username']}"
        return user_id

    # Read Models
    @classmethod
    def get_all(cls):
        query = """
            SELECT * FROM users;
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
            SELECT * FROM users 
            WHERE id = %(id)s;
        """
        results = connectToMySQL(cls.db).query_db(query, data)
        return cls(results[0])

    @classmethod
    def get_user_by_email(cls, email):
        data = {"email": email}
        query = """
            SELECT * FROM users 
            WHERE email = %(email)s;
        """
        results = connectToMySQL(cls.db).query_db(query, data)
        if results:
            return cls(results[0])
        return False

    # Update Models
    @classmethod
    def update(cls, data):
        query = """
            UPDATE users
            SET 
            username = %(username)s,
            email = %(email)s,
            password = %(password)s
            WHERE id = %(id)s;
        """
        return connectToMySQL(cls.db).query_db(query, data)

    # Delete Models
    @classmethod
    def delete(cls, id):
        data = {"id": id}
        query = """
            DELETE FROM users
            WHERE id = %(id)s;
        """
        return connectToMySQL(cls.db).query_db(query, data)

    # Login Method
    @staticmethod
    def login(data):
        this_user = User.get_user_by_email(
            data["email"]
        )  # gets user email using helper function
        if this_user:  # does the user exist
            if bcrypt.check_password_hash(
                this_user.password, data["password"]
            ):  # looks at password used to login and the hashed password (works like keying species)
                session["user_id"] = this_user.id
                session["username"] = f"{this_user.username}"
                return this_user.id
        flash("Login incorrect", "login")
        return False

    # Validations
    @staticmethod
    def validate_user(data):
        EMAIL_REGEX = re.compile(
            r"^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$"
        )  # putting here helps protect this.
        is_valid = True
        if len(data["username"]) < 2:
            flash("Must be at least 2 characters.", "username")
            is_valid = False
        if len(data["password"]) < 1:
            flash("Must be at least 8 characters.", "password")
            is_valid = False
        # if re.search('[0-9]',data['password']) is None: #a number is required
        #     flash('Must have a number.', 'password')
        #     is_valid = False
        # if re.search('[A-Z]',data['password']) is None: #an uppercase is required
        #     flash('Must have an uppercase letter.', 'password')
        #     is_valid = False
        if data["password"] != data["confirm_password"]:
            flash("Passwords Must Match", "confirm_password")
            is_valid = False
        if not EMAIL_REGEX.match(data["email"]):  # email validation
            flash("Invalid email", "email")
            is_valid = False
        if User.get_user_by_email(data["email"]):  # unique/doesnt exist in database
            flash("Email exists already", "email")
            is_valid = False
        return is_valid
