from flask import Blueprint, request
from flask_login import current_user
from app.models import Comment, Card
from .user_routes import login_required
from ..forms.comment_form import CommentForm
from ..models.db import db

comments_routes = Blueprint('comments', __name__)

@comments_routes.route('/')
def get_all_comments():
  ret = []
  all_comments = Comment.query.all()

  for comment in all_comments:
    ret.append(comment.to_dict())

  return {
    "Comments": ret
  }

# move to cards router
@comments_routes.route('/cards/<int:card_id>/comments', methods=["GET"])
# @login_required
def get_all_comments_for_card(card_id):
  ret = []
  all_card_comments = Comment.query.filter(Comment.id == card_id).all()
  for comment in all_card_comments:
    ret_comment = {
      "id": comment.id,
      "comment_text": comment.comment_text,
      "user_id": comment.user_id,
      "card_id": comment.card_id,
      "created_at": comment.created_at,
      "updated_at": comment.updated_at
    }

    ret.append(ret_comment)

  return {
    "Comments": ret
  }


# move to cards router
@comments_routes.route('/cards/<int:card_id>/comments', methods=["POST"])
# @login_required
def post_comment_on_card(card_id):
  card = Card.query.get(card_id)
  form = CommentForm()

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

    return new_comment

  return {
    "message": "Bad Request",
    "errors": form.errors
  }

@comments_routes.route('/comments/<int:comment_id>', methods=["PUT"])
# @login_required
def edit_a_comment(comment_id):
  existing_comment = Comment.query.get(comment_id)
  form = CommentForm()

  if not existing_comment:
    return {
      "message": "Comment does not exist"
    }

  if form.validate_on_submit():
    updated_comment = Comment(
      comment_text = form.data['comment_text'],
      user_id = current_user.get_id(),
      card_id = existing_comment['card_id']
    )
    db.session.commit()

    return updated_comment

  return {
    "message": "Bad Request",
    "errors": form.errors
  }


@comments_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
# @login_required
def delete_a_comment(comment_id):
  comment_to_delete = Comment.query.get(comment_id)

  if not comment_to_delete:
    return {
      "message": "Comment does not exist"
    }

  db.session.delete(comment_to_delete)
  db.session.commit()

  return {
    "message": "Successfully Deleted"
  }
