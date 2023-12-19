from flask import Blueprint, request
from flask_login import current_user
from app.models import Comment, Card
from app.forms import comment_form
from .user_routes import login_required
from ..forms.comment_form import CommentForm
from ..models.db import db

comments_routes = Blueprint('comments', __name__)

# move to cards router
@comments_routes.route('/cards/<int:card_id>/comments', methods=["GET"])
@login_required
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


# @comments_routes.route('/')
# def ok():
#   print('hi')
#   print('\n')
#   comments = Comment.query.all()
#   print('\n')
#   print('comments: ', comments)
#   for comment in comments:
#     print('comment: ', comment.card_id)
#   return 'hi'

# move to cards router
@comments_routes.route('/cards/<int:card_id>/comments', methods=["POST"])
# @login_required
def post_comment_on_card(card_id):
  ret = []
  card = Card.query.get(card_id)
  form = CommentForm()

  print('card.user_id: ', card.id)

  if not card:
    return "wrong" #fix this <---------------------------



  print('form.data: ', form.data)
  print('current user: ', dir(current_user))
  print('current user: ', current_user.get_id())

  if form.validate_on_submit():
    new_comment = Comment(
      comment_text = form.data['comment_text'],
      user_id = current_user.get_id(),
      card_id = card_id
    )
    db.session.add(new_comment)
    db.session.commit()

    return new_comment

  return "hi"

@comments_routes.route('/comments/<int:id>', methods=["PUT"])
def edit_a_comment(comment_id):
  pass

@comments_routes.route('/comments/<int:id>', methods=['DELETE'])
def delete_a_comment(comment_id):
  pass
