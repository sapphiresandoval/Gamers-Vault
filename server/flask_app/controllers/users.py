from flask_app import app
from flask import jsonify, request, session
from flask_app.models import user

# Create Controller
@app.post("/api/users/create")
def create_user():
    session["user"] = request.json  # Expecting JSON payload
    user_id = user.User.create(request.json)
    if user_id:
        return jsonify({"message": "User created successfully", "user_id": user_id}), 201
    return jsonify({"message": "User creation failed"}), 400


# Login
@app.post("/api/login")
def login():
    session["user"] = request.json  # Expecting JSON payload
    user_id = user.User.login(request.json)
    if user_id:
        return jsonify({"message": "Login successful", "user_id": user_id}), 200
    return jsonify({"message": "Login failed"}), 401


# Logout/clear session
@app.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logout successful"}), 200
