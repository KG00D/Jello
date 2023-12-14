from flask import Blueprint, request
from flask_login import current_user
from app.models import Comment
from app.forms import comment_form

comments_routes = Blueprint('comments', __name__)

@comments_routes.route('/cards/<int:card_id>/comments', methods=["GET"])
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


@comments_routes.route('/')
def ok():
  print('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
  print('\n')
  comments = Comment.query.all()
  print('\n')
  print('comments: ', comments)
  for comment in comments:
    print('comment: ', comment.card_id)
  return 'hi'

@comments_routes.route('/cards/<int:id>/comments', methods=["POST"])
def post_comment_on_card(card_id):
  pass

@comments_routes.route('/comments/<int:id>', methods=["PUT"])
def edit_a_comment(comment_id):
  pass

@comments_routes.route('/comments/<int:id>', methods=['DELETE'])
def delete_a_comment(comment_id):
  pass
