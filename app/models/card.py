from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .user import userscards


class Card(db.Model, UserMixin):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.Text, nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    cards_users = db.relationship("User", secondary=userscards, back_populates="users_cards")

    card_comments = db.relationship("Comment", back_populates="comments_card", cascade="all, delete-orphan")

    cards_list = db.relationship("List", back_populates="list_cards")

    #ToDo Card labels

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            "list_id": self.list_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
