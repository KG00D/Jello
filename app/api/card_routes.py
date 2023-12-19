from flask import Flask, jsonify, Blueprint, redirect, request
from app.models import Card, List
from .user_routes import login_required
from ..forms import card_form

card_routes = Blueprint("cards", __name__)

##needs to be in lists router
# @card_routes.route("/:id/cards", methods=["POST"])
# @login_required
# def create_new_card(list_id):
#     form = CardForm()
#     lst = List.query.filter(List.list_id == list_id)
#     if len(lst) == 0:
#         return jsonify({"message": "List does not exist"})
#     if form.validate_on_submit():
#         new_card = Card(
#             name=form.data["name"],
#             description=form.data["description"],
#             list_id=lst["id"])
#         db.session.add(new_card)
#         db.session.commit()
#         return new_card
    
@card_routes.route("/:id", methods=["PUT"])
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

@card_routes.route("/:id", methods=["DELETE"])
@login_required
def delete_card(card):
    card = Card.query.filter(Card.id == card["id"])

    
    
    
