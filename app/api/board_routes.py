from flask import Blueprint, request
from app.models import Board, List, Card
from flask_login import current_user, login_user, logout_user, login_required

board_routes = Blueprint('boards', __name__)

@board_routes.route('/')
# @login_required
def public_boards():
    public_query = Board.query.filter(Board.is_public==True).all()
    public_boards = [board.to_dict() for board in public_query]
    return {
        "Public Boards": public_boards,
    }

@board_routes.route('/session')
@login_required
def my_boards():
    my_boards = []
    if current_user.is_authenticated:
        my_query = Board.query.filter(Board.user_id == current_user.id).all()
        my_boards = [board.to_dict() for board in my_query]
    return {
        "My Boards": my_boards
    }

@board_routes.route('/<int:id>')
def board_details(id):
    board_query = Board.query.filter(Board.id==id).join(List).join(Card).first_or_404()
    board_details = board_query.to_dict()
    if board_query.board_lists:
        board_details["lists"] = [list_item.to_dict() for list_item in board_query.board_lists]

    
    return {
        id: board_details
    }
