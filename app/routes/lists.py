from flask import Flask, request, jsonify
from your_flask_app import db
from models.lists import List
#from models.boards import Board?
#TODO CHECK BOARD IMPORT

app = Flask(__name__)

@app.route('/api/boards/<int:board_id>/lists', methods=['GET'])
def view_lists(board_id):
    #TODO Are we doing this still?
    if not user_is_authenticated():  
        return jsonify({'error': 'Unauthorized'}), 403

    #TODO Check board stuff here.....
    board = Board.query.get(board_id)
    if not board:
        return jsonify({'error': 'Board not found'}), 404

    lists = List.query.filter_by(board_id=board_id).all()
    return jsonify([{'id': lst.id, 'title': lst.title} for lst in lists]), 200

@app.route('/api/boards/<int:board_id>/lists', methods=['POST'])
def create_list(board_id):
    if not user_is_authenticated():
        return jsonify({'error': 'Unauthorized'}), 403

    board = Board.query.get(board_id)
    if not board:
        return jsonify({'error': 'Board not found'}), 404

    data = request.json
    if not data or 'title' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_list = List(title=data['title'], board_id=board_id)
    db.session.add(new_list)
    db.session.commit()
    return jsonify({'id': new_list.id, 'title': new_list.title}), 200

@app.route('/api/lists/<int:list_id>', methods=['PUT'])
def edit_list(list_id):
    if not user_is_authenticated():
        return jsonify({'error': 'Unauthorized'}), 403

    lst = List.query.get(list_id)
    if not lst:
        return jsonify({'error': 'List not found'}), 404

    data = request.json
    if not data or 'title' not in data:
        return jsonify({'error': 'Missing data'}), 400

    lst.title = data['title']
    db.session.commit()
    return jsonify({'id': lst.id, 'title': lst.title}), 200

@app.route('/api/lists/<int:list_id>', methods=['DELETE'])
def delete_list(list_id):
    if not user_is_authenticated():
        return jsonify({'error': 'Unauthorized'}), 403

    lst = List.query.get(list_id)
    if not lst:
        return jsonify({'error': 'List not found'}), 404

    db.session.delete(lst)
    db.session.commit()
    return jsonify({'message': 'List deleted successfully'}), 200


if __name__ == '__main__':
    app.run(debug=True)