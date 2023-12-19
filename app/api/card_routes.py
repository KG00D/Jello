from flask import Flask, jsonify, Blueprint, redirect, request
from app.models import Card, List
from .user_routes import login_required
from ..forms import card_form

card_routes = Blueprint("cards", __name__)
    
@card_routes.route("/<int:card_id>", methods=["PUT"])
@login_required
def update_card(card):
    print(card, '-----card in update_card route')
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    card = Card.query.filter(Card.id == card["id"])
    if not card:
        return { "message": "Card does not exist" }
    
    if form.validate_on_submit():
        card_data = request.json
        card.name = card_data["name"]
        card.description = card_data["description"]
        db.session.commit()
    card = Card.query.filter(Card.id == card["id"]).all()
    card_dict = [card[0].to_dict()][0]
    return { "Card": card_dict}

@card_routes.route("/:id", methods=["DELETE"])
@login_required
def delete_card(card):
    card = Card.query.filter(Card.id == card["id"])

    
    
    
