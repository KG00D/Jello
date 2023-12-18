from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Comment(db.Model, UserMixin):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(256), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("cards.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    comments_card = db.relationship("Card", back_populates="card_comments")

    comments_user = db.relationship("User", back_populates="user_comments")

    def to_dict(self):
        return {
            'id': self.id,
            'comment_text': self.comment_text,
            'user_id': self.user_id,
            "card_id": self.card_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
