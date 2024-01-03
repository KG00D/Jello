from flask import Blueprint, request
from flask_login import current_user
from app.models import Comment, User
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
  commenter_details = User.query.filter(User.id == existing_comment.user_id).first()
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  print('\n', 'existing_comment before: ', existing_comment.to_dict())
  if not existing_comment:
    return {
      "message": "Comment does not exist"
    }

  if form.validate_on_submit():
    existing_comment.comment_text = form.data['comment_text']
    db.session.commit()
    ret = {
      "id": existing_comment.id,
      "comment_text": existing_comment.comment_text,
      "user_id": existing_comment.user_id,
      "commenter_details": {
            "username": commenter_details.username,
            "first_name": commenter_details.first_name,
            "last_name": commenter_details.last_name,
          },
      "card_id": existing_comment.card_id,
      "created_at": existing_comment.created_at,
      "updated_at": existing_comment.updated_at,
    }

    return ret

  return {
    "message": "Bad Request",
    "errors": form.errors
  }


@comments_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_a_comment(comment_id):
  comment_to_delete = Comment.query.filter(Comment.id == comment_id).first()

  if not comment_to_delete:
    return {
      "message": "Comment does not exist"
    }

  db.session.delete(comment_to_delete)
  db.session.commit()

  return {
    "message": "Successfully Deleted"
  }
