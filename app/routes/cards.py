from Flask import flask, jsonify, Blueprint
from models.cards import Card, List, CardLabel
from ..api/auth_routes import authenticate
from ..api/user_routes import login_required

bp = Blueprint("cards", __name__, url_prefix="cards")

##needs to be in lists router
@bp.route("/:id/cards")
@login_required
def view_all_cards(list_id):
    cards = Card.query.filter(Card.list_id == list_id)
    if len(cards) == 0:
        return jsonify({"message": "Cards do not exist for this list"})
    response = []
    for card in cards:
        labels = CardLabel.query.fiter(CardLabel.card_id == card["id"])
        card_dict = { 
            *card,
            "labels": labels
        }
        response.append(card_dict)
    return jsonify({"Cards": response})

##needs to be in lists router
@bp.route("/:id/cards", methods=["POST"])
def create_new_card(list_id):
    lst = List.query.filter(List.list_id == list_id)
    if len(lst) == 0:
        return jsonify{"message": "List does not exist"}
    board_id = lst["board_id"]
    
    
    
