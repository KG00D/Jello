from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app.models import List, Board, db

lists_routes = Blueprint('lists', __name__)

@lists_routes.route('/boards/<int:board_id>/lists', methods=['GET'])
@login_required
def view_lists(board_id):
    board = Board.query.get(board_id)
    if not board:
        return jsonify({'errors': 'Board not found'}), 404

    lists = List.query.filter_by(board_id=board_id).all()
    return jsonify([{'id': lst.id, 'title': lst.title} for lst in lists]), 200

@lists_routes.route('/boards/<int:board_id>/lists', methods=['POST'])
@login_required
def create_list(board_id):
    board = Board.query.get(board_id)
    if not board:
        return jsonify({'errors': 'Board not found'}), 404

    data = request.json
    if not data or 'title' not in data:
        return jsonify({'errors': 'Missing data'}), 400

    new_list = List(title=data['title'], board_id=board_id)
    db.session.add(new_list)
    db.session.commit()
    return jsonify({'id': new_list.id, 'title': new_list.title}), 201

@lists_routes.route('/lists/<int:list_id>', methods=['PUT'])
@login_required
def edit_list(list_id):
    lst = List.query.get(list_id)
    if not lst:
        return jsonify({'errors': 'List not found'}), 404

    data = request.json
    if not data or 'title' not in data:
        return jsonify({'errors': 'Missing data'}), 400

    lst.title = data['title']
    db.session.commit()
    return jsonify({'id': lst.id, 'title': lst.title}), 200

@lists_routes.route('/lists/<int:list_id>', methods=['DELETE'])
@login_required
def delete_list(list_id):
    lst = List.query.get(list_id)
    if not lst:
        return jsonify({'errors': 'List not found'}), 404

    db.session.delete(lst)
    db.session.commit()
    return jsonify({'message': 'List deleted successfully'}), 200
