from flask_app import app
from flask import request, jsonify
from flask_cors import cross_origin
from flask_app.models import user, game, collection
from flask_app.controllers import users, games

# import entire file, rather than class, to avoid circular imports
# As you add model files add them to the import above
# This file is the second stop in Flask's thought process, here it looks for a route that matches the request


# Create Controller
@app.route("/api/collections/createcollection", methods=["POST", "OPTIONS"])
@cross_origin(origin='*')
def make_collection():
    user_id = request.json.get("user_id")  # Expect user_id in the request payload
    game_id = request.json.get("game_id")
    collection_name = request.json.get("collection_name")
    if not user_id or not game_id or not collection_name:
        return jsonify({"message": "Unauthorized"}), 401

    collection_data = request.json
    print("Received data:", collection_data)
    if collection.Collection.create_collection(collection_data): 
        return jsonify({"message": "collection created successfully"}), 200
    return jsonify({"message": "collection creation failed"}), 400

#Get all collections
@app.route('/api/collections', methods=["GET"])
def get_collections():
    all_collections = collection.Collection.get_all_collections()
    return all_collections

#Get games by collection
@app.route("/api/collections/wish/<int:user_id>", methods=["GET"])
def get_wish_collection():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401
    
    wish_list = collection.Collection.get_user_wish_list(user_id)
    return jsonify(wish_list)


# Update
@app.post("/api/games/collections/update")
def collection_update(id):
    collection_data = request.json
    collection_data['id'] = id
    if collection.Collection.update_collection(collection_data):
        return jsonify({"message": "Collection updated successfully"}), 200
    return jsonify({"message": "Collection update failed"}), 400

# Delete
@app.route("/api/collections/delete/<int:id>", methods=["DELETE"])
def collection_delete(id):
    if collection.Collection.delete_collection({"id": id}):  # Wrap id in a dict as expected by delete_collection
        return jsonify({"message": "Collection deleted successfully"}), 200
    return jsonify({"message": "Collection deletion failed"}), 400