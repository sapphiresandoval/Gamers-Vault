# make sure to send as a jsonify so we can call as an API in react
from flask_app import app
from flask import jsonify, request, session
from flask_app.models import rating

# Create Controllers
@app.post('/api/ratings/create')
def create_rating():
    if 'user_id' not in session:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.json
    data['user_id'] = session['user_id']

    if not rating.Rating.create_rating(data):
        return jsonify({"message": "Failed to add rating due to validation errors"}), 400

    return jsonify({"message": "Rating added successfully"}), 201

# Read Controllers
@app.get('/api/games/<int:game_id>/ratings')
def get_ratings_for_game(game_id):
    ratings = rating.Rating.get_ratings_by_game(game_id)
    return jsonify(ratings), 200

# Update Controllers
@app.put('/api/ratings/update/<int:id>')
def update_rating(id):
    if 'user_id' not in session:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.json
    data['id'] = id

    if not rating.Rating.update_rating(data):
        return jsonify({"message": "Failed to update rating due to validation errors"}), 400

    return jsonify({"message": "Rating updated successfully"}), 200

# Delete Controllers
@app.delete('/api/ratings/delete/<int:id>')
def delete_rating(id):
    if 'user_id' not in session:
        return jsonify({"message": "Unauthorized"}), 401

    rating_instance = rating.Rating.get_one_rating(id)
    if not rating_instance or rating_instance.user_id != session['user_id']:
        return jsonify({"message": "Unauthorized to delete this rating"}), 403

    rating.Rating.delete_rating(id)
    return jsonify({"message": "Rating deleted successfully"}), 200
