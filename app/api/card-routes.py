from Flask import flask, jsonify, Blueprint, redirect. request
from models.cards import Card, List, CardLabel
from auth_routes import authenticate
from user_routes import login_required
from ..forms import card_form

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
@login_required
def create_new_card(list_id):
    form = CardForm()
    lst = List.query.filter(List.list_id == list_id)
    if len(lst) == 0:
        return jsonify{"message": "List does not exist"}
    if form.validate_on_submit():
        new_card = Card(
            name=form.data["name"],
            description=form.data["description"],
            list_id=lst["id"])
        db.session.add(new_card)
        db.session.commit()
        return new_card
    
@bp.route("/:id", methods=["PUT"])
@login_required
def update_card(card):
    card_data = request.json
    form = CardForm()
    card = Card.query.filter(Card.id == card["id"])
    if form.validate_on_submit():
        card.name = form.data["name"]
        card.description = form.data["description"]
        db.session.commit()
    ##TO DO members##
    card = Card.query.filter(Card.id == card["id"])
    return card

@bp.route("/:id", methods=["DELETE"])
@login_required
@authenticate
def delete_card(card):
    card = Card.query.filter(Card.id == card["id"])
    
    
    
    
