from flask import Blueprint, request
from app.models import Board
from flask_login import current_user, login_user, logout_user, login_required

board_routes = Blueprint('boards', __name__)

@board_routes.route('/')
# @login_required
def landing_page():
    public_query = Board.query.filter(Board.is_public==True).all()
    public_boards = [board.to_dict() for board in public_query]
    my_boards = []
    if current_user.is_authenticated:
        my_query = Board.query.filter(Board.user_id == current_user.id).all()
        my_boards = [board.to_dict() for board in my_query]
    return {
        "Public Boards": public_boards,
        "My Boards": my_boards
    }
