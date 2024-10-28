from flask_app import app
from flask import jsonify, request, session
from flask_app.models import user, game

# Create Game
@app.post('/api/games/create')
def create_game():
    session['game'] = request.json  # Expecting JSON payload
    if game.Game.create(request.json):
        return jsonify({"message": "Game created successfully"}), 201
    return jsonify({"message": "Game creation failed"}), 400

# Rate Game
@app.post('/api/rate')
def rate():
    game_id = request.json.get('game_id')
    rating_result = game.Game.rating(request.json)
    if rating_result:
        return jsonify({"message": "Rating added successfully", "game_id": game_id}), 200
    return jsonify({"message": "Failed to add rating"}), 400

# Read Controller - Get all games
@app.route('/api/games', methods=['GET'])
def game_page():
    if 'user_id' not in session:
        return jsonify({"message": "Unauthorized"}), 401
    all_games = game.Game.collectors_games()
    return jsonify(all_games), 200

# Get Add Game Form
@app.route('/api/games/add', methods=['GET'])
def add_form():
    if 'user_id' not in session:
        return jsonify({"message": "Unauthorized"}), 401
    return jsonify({"message": "Add game form access granted"}), 200

# Get One Game
@app.route('/api/games/<int:id>', methods=['GET'])
def one_game(id):
    if 'user_id' not in session:
        return jsonify({"message": "Unauthorized"}), 401
    game_info = game.Game.game_with_collector_and_ratings(id)
    return jsonify(game_info), 200

# Update Game
@app.post('/api/games/edit')
def update():
    if not game.Game.validate_game(request.json):
        session['game'] = request.json
        return jsonify({"message": "Validation failed"}), 400
    game.Game.update(request.json)
    return jsonify({"message": "Game updated successfully"}), 200

# Delete Game
@app.route('/api/games/delete/<int:id>', methods=['DELETE'])
def delete(id):
    game.Game.delete(id)
    return jsonify({"message": "Game deleted successfully"}), 200
