from flask import Blueprint, request
from app.models import Board, List, Card, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.board_form import BoardForm

board_routes = Blueprint('boards', __name__)

# Gets
@board_routes.route('/')
def public_boards():
    public_query = Board.query.filter(Board.is_public==True).all()
    public_boards = [board.to_dict() for board in public_query]
    return {
        "Public_Boards": public_boards,
    }

@board_routes.route('/session')
@login_required
def my_boards():
    my_boards = []
    if current_user.is_authenticated:
        my_query = Board.query.filter(Board.user_id == current_user.id).all()
        my_boards = [board.to_dict() for board in my_query]
    return {
        "My_Boards": my_boards
    }

@board_routes.route('/<int:id>')
def board_details(id):
    board_query = Board.query.filter(Board.id==id).outerjoin(List).outerjoin(Card).first_or_404()

    board_details = board_query.to_dict()
    if board_query.board_lists:
        board_details["Lists"] = [list_item.to_dict() for list_item in board_query.board_lists]

        for index, list in enumerate(board_details["Lists"]):
            if board_query.board_lists[index].list_cards:
                board_details["Lists"][index]["Cards"] = [card.to_dict() for card in board_query.board_lists[index].list_cards]
    return {
        "Board_Details": board_details
    }

# post
@board_routes.route('/', methods=["POST"])
@login_required
def new_board():
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_board = Board(
            user_id = current_user.id,
            name = form.data["name"],
            background_image = form.data["background_image"],
            # note has to be lowercase coming from the frontend
            is_public = form.data["is_public"]
        )
        db.session.add(new_board)
        db.session.commit()
        return new_board.to_dict()
    return form.errors, 401

# update
@board_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_board(id):
    board = Board.query.get(id)
    if board.boards_owner.id != current_user.id:
        return {"message": "Unauthorized"}, 401
    if not board:
        return {"message": "Board not found"}

    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        board.name = form.data["name"]
        board.background_image = form.data["background_image"]
        board.is_public = form.data["is_public"]
        db.session.commit()
        return board.to_dict()

    return form.errors, 401

# delete
@board_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_board(id):
    board = Board.query.get(id)
    if board.boards_owner.id != current_user.id:
        return {"message": "Unauthorized"}, 401
    if not board:
        return {"message": "Board not found"}
    db.session.delete(board)
    db.session.commit()
    return {"message": f"Board {id} has been deleted"}
