from flask import Flask, jsonify, Blueprint, redirect, request
from app.models import Card, List, db
from .user_routes import login_required
from app.forms.card_form import CardForm

card_routes = Blueprint("cards", __name__)
    
@card_routes.route("/<int:card_id>", methods=["PUT"])
@login_required
def update_card(card_id):
    card_data = request.json
    card = Card.query.filter(Card.id == card_id).first()
    if not card:
        return { "message": "Card does not exist" }    
    card_data = request.json
    card.name = card_data["name"]
    card.description = card_data["description"]
    db.session.commit()
    card = Card.query.filter(Card.id == card_id).all()
    card_dict = [card[0].to_dict()][0]
    return { "Card": card_dict}

@card_routes.route("/<int:card_id>", methods=["DELETE"])
@login_required
def delete_card(card_id):
    card = Card.query.filter(Card.id == card_id).first()
    if not card:
        return { "message": "Card does not exist" }    
    db.session.delete(card)
    db.session.commit()
    return { "message": "Card successfully deleted" }

    
    
    
