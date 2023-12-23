from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app.models import List, Board, Card, db
from flask import current_app
from app.forms.card_form import CardForm

lists_routes = Blueprint('lists', __name__)

@lists_routes.route('/boards/<int:board_id>/lists', methods=['GET'])
@login_required
def view_lists(board_id):
    board_query = Board.query.filter(Board.id == board_id).join(List).first_or_404()
    board_details = board_query.to_dict()

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

@lists_routes.route('/boards/<int:board_id>/lists/<int:list_id>', methods=['PUT'])
@login_required
def edit_list(board_id, list_id):
    lst = List.query.filter_by(id=list_id, board_id=board_id).first()
    if not lst:
        return jsonify({'errors': 'List not found on the specified board'}), 404

    data = request.json
    if not data or 'title' not in data:
        return jsonify({'errors': 'Missing data'}), 400

    lst.title = data['title']
    db.session.commit()
    return jsonify(lst.to_dict()), 200


@lists_routes.route('/boards/<int:board_id>/lists/<int:list_id>', methods=['DELETE'])
@login_required
def delete_list(board_id, list_id):
    lst = List.query.filter_by(id=list_id, board_id=board_id).first()
    if not lst:
        return jsonify({'errors': 'List not found'}), 404

    db.session.delete(lst)
    db.session.commit()
    return jsonify({'message': 'List deleted successfully'}), 200

@lists_routes.route("/lists/<int:list_id>/cards")
@login_required
def view_all_cards(list_id):
    cards = Card.query.filter(Card.list_id == list_id).all()
    response = []
    for single_card in cards:
        card_dict = single_card.to_dict()
        response.append(card_dict)
    if len(response) == 0:
        return { "Cards": None }
    return { "Cards": response }

@lists_routes.route("/lists/<int:list_id>/cards", methods=["POST"])
@login_required
def create_new_card(list_id):
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    list_query = List.query.filter(List.id == list_id).all()
    
    if not list_query:
        return { "message": "List does not exist" }

    list_query_list = [list_query[0].to_dict()]
    if form.validate_on_submit():
        card_data = request.json
        new_card = Card(
            name=card_data["name"],
            list_id= card_data["list_id"])
        db.session.add(new_card)
        db.session.commit()
        return { "Card": new_card.to_dict() }
    else:
        print('----we are in else statement----')
        print(request.json, '----request.json')
        return { "Message": "validation error"}


