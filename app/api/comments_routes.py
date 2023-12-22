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

@comments_routes.route('/<int:comment_id>', methods=["PUT"])
@login_required
def edit_a_comment(comment_id):
  existing_comment = Comment.query.get(comment_id)
  form = CommentForm()

  if not existing_comment:
    return {
      "message": "Comment does not exist"
    }

  if form.validate_on_submit():
    existing_comment.comment_text = form.data['comment_text']
    db.session.commit()

    return existing_comment.to_dict()

  return {
    "message": "Bad Request",
    "errors": form.errors
  }


@comments_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
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
