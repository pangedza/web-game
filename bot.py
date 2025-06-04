from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='.')

# In-memory list to store scores
scores = []

@app.route('/')
def index():
    """Serve the main game page."""
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    """Serve static files like JS and CSS."""
    return send_from_directory('.', path)

@app.route('/submit_score', methods=['POST'])
def submit_score():
    """Receive a player's score and store it in memory."""
    data = request.get_json(force=True)
    name = data.get('name')
    score = data.get('score')
    if not name or score is None:
        return jsonify({'error': 'Invalid data'}), 400
    scores.append({'name': name, 'score': int(score)})
    return jsonify({'message': 'Score recorded'})

@app.route('/scores')
def get_scores():
    """Return all stored scores."""
    return jsonify(scores)

if __name__ == '__main__':
    app.run(debug=True)
