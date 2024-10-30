from flask_app import app
from flask import jsonify, request
from flask_app.models import user, game

# Create Game
@app.post('/api/games/create')
def create_game():
    user_id = request.json.get('user_id')  # Expect user_id in the request payload
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401
    
    game_data = request.json
    if game.Game.create_game(game_data):  # Pass user_id to the create function
        return jsonify({"message": "Game created successfully"}), 201
    return jsonify({"message": "Game creation failed"}), 400

# Rate Game
@app.post('/api/rate')
def rate():
    user_id = request.json.get('user_id')  # Expect user_id in the request payload
    game_id = request.json.get('game_id')
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401
    
    rating_result = game.Game.rating(request.json)
    if rating_result:
        return jsonify({"message": "Rating added successfully", "game_id": game_id}), 200
    return jsonify({"message": "Failed to add rating"}), 400

# Read Controller - Get all games
@app.route('/api/games', methods=['GET'])
def game_page():
    all_games = game.Game.get_all()  # Pass user_id if needed
    return jsonify(all_games), 200

# Get Add Game Form
@app.route('/api/games/add', methods=['GET'])
def add_form():
    user_id = request.json.get('user_id')  # Expect user_id in the request payload
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401
    
    return jsonify({"message": "Add game form access granted"}), 200

# Get One Game
@app.route('/api/games/<int:id>', methods=['GET'])
def one_game(id):
    user_id = request.json.get('user_id')  # Expect user_id in the request payload
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401
    
    game_info = game.Game.game_with_collector_and_ratings(id, user_id)  # Pass user_id if needed
    return jsonify(game_info), 200

# Update Game
@app.post('/api/games/edit')
def update():
    user_id = request.json.get('user_id')  # Expect user_id in the request payload
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401
    
    if not game.Game.validate_game(request.json):
        return jsonify({"message": "Validation failed"}), 400
    
    game.Game.update(request.json, user_id)  # Pass user_id if needed
    return jsonify({"message": "Game updated successfully"}), 200

# Delete Game
@app.route('/api/games/delete/<int:id>', methods=['DELETE'])
def delete(id):
    user_id = request.json.get('user_id')  # Expect user_id in the request payload
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401
    
    game.Game.delete(id, user_id)  # Pass user_id if needed
    return jsonify({"message": "Game deleted successfully"}), 200
