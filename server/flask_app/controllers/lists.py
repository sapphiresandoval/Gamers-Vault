from flask_app import app
from flask import render_template, redirect, request, session, jsonify
from flask_app.models import user, game, list
from flask_app.controllers import users, games

# import entire file, rather than class, to avoid circular imports
# As you add model files add them to the import above
# This file is the second stop in Flask's thought process, here it looks for a route that matches the request


# Create Controller
@app.route("api/games/lists/create", methods=["POST"])
def create():
    user_id = request.json.get("user_id")  # Expect user_id in the request payload
    game_id = request.json.get("game_id")
    if not user_id or game_id:
        return jsonify({"message": "Unauthorized"}), 401

    list_data = request.json
    if list.List.create_lists(list_data):  # Pass user_id to the create function
        return jsonify({"message": "list created successfully"}), 201
    return jsonify({"message": "list creation failed"}), 400


# Update
@app.post("api/games/list/update")
def update():
    list.List.update_list(id)
    return jsonify({"message": "List updated successfully"}), 200


# Delete
@app.route("/lists/delete/<int:id>", methods=["DELETE"])
def delete(id):
    list.List.delete_list(id)
    return jsonify({"message": "List deleted successfully"}), 200
