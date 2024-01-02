from flask import Flask, jsonify, Blueprint, redirect, request
from flask_login import current_user
from app.models import Card, List, db, Comment, User
from .user_routes import login_required
from app.forms.card_form import CardForm
from ..forms.comment_form import CommentForm

card_routes = Blueprint("cards", __name__)

@card_routes.route('/<int:card_id>/comments', methods=["GET"])
@login_required
def get_all_comments_for_card(card_id):
  ret = []
  all_card_comments = Comment.query.filter(Comment.card_id == card_id).all()
  for comment in all_card_comments:
    commenter_details = User.query.filter(User.id == comment.user_id).first()
    ret_comment = {
      "id": comment.id,
      "comment_text": comment.comment_text,
      "user_id": comment.user_id,
      "commenter_details": {
            "username": commenter_details.username,
            "first_name": commenter_details.first_name,
            "last_name": commenter_details.last_name,
          },
      "card_id": comment.card_id,
      "created_at": comment.created_at,
      "updated_at": comment.updated_at,
    }

    ret.append(ret_comment)

  return {
    "Comments": ret
  }


@card_routes.route('/<int:card_id>/comments', methods=["POST"])
@login_required
def post_comment_on_card(card_id):
  card = Card.query.get(card_id)
  commenter_details = User.query.filter(User.id == current_user.id).first()
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if not card:
    return {
      "message": "Card does not exist"
    }

  if form.validate_on_submit():
    new_comment = Comment(
      comment_text = form.data['comment_text'],
      user_id = current_user.get_id(),
      card_id = card_id
    )
    db.session.add(new_comment)
    db.session.commit()

    ret = {
      "id": new_comment.id,
      "comment_text": new_comment.comment_text,
      "user_id": new_comment.user_id,
      "commenter_details": {
            "username": commenter_details.username,
            "first_name": commenter_details.first_name,
            "last_name": commenter_details.last_name,
          },
      "card_id": new_comment.card_id,
      "created_at": new_comment.created_at,
      "updated_at": new_comment.updated_at,
    }

    return ret

  return {
    "message": "Bad Request",
    "errors": form.errors
  }

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
