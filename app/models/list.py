from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class List(db.Model, UserMixin):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)
    order_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    lists_board = db.relationship("Board", back_populates="board_lists")
    list_cards = db.relationship("Card", back_populates="cards_list")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'board_id': self.board_id,
            'order_id': self.order_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
