from flask import Blueprint, request
from app.models import Board
from flask_login import current_user, login_user, logout_user, login_required

board_routes = Blueprint('boards', __name__)

@board_routes.route('/')
def landing_page():
    public_query = Board.query.filter(Board.is_public==True).all()
    public_boards = [board.to_dict() for board in public_query]
    print(public_boards)
    # user_query = []
    # if current_user.is_authenticated:
    #     user_boards = list(Board.query.filter(current_user.id).all())


    return {
        "public_boards": public_boards
        # "user_boards": user_boards
    }
