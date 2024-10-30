from flask_app import app
from flask import jsonify, request, session
from flask_app.models import user


# Create Controller
@app.post("/api/users/create")
def create_user():
    session["user"] = request.json  # Expecting JSON payload
    user_id = user.User.create(request.json)
    if user_id:
        return (
            jsonify({"message": "User created successfully", "id": user_id}),
            201,
        )
    return jsonify({"message": "User creation failed"}), 400


# Login
@app.post("/api/login")
def login():
    data = request.json  # Expecting JSON payload
    print(f"Received data: {data}")
    session["user"] = data
    user_id = user.User.login(data)
    if user_id:
        return jsonify({"message": "Login successful", "id": user_id}), 200
    return jsonify({"message": "Login failed"}), 401


# Logout/clear session
@app.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logout successful"}), 200


# Get One
@app.route("/api/user/<int:id>", methods=["GET"])
def get_user(id):
    # user_id = request.json.get("user_id")  # Expect user_id in the request payload
    # if not user_id:
    #     return jsonify({"message": "Unauthorized"}), 401

    user_info = user.User.get_one(id)
    return jsonify(user_info.to_dict()), 200
