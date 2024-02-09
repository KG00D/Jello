from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .user import usersboards

class Board(db.Model, UserMixin):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    is_public = db.Column(db.Boolean)
    background_image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    boards_users = db.relationship("User", secondary=usersboards, back_populates="users_boards")

    board_lists = db.relationship("List", back_populates="lists_board", cascade="all, delete-orphan")

    boards_owner = db.relationship("User", back_populates="owner_boards")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'is_public': self.is_public,
            "background_image": self.background_image,
            "boards_owner": self.boards_owner.to_dict(),
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user_id": self.user_id
        }
