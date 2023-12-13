from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .user import users_boards


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

    boards_users = db.relationship("User", secondary=users_boards, back_populates="users_boards")

    board_lists = db.relationship("List", back_populates="lists_board", cascade="all, delete-orphan")

    boards_owner = db.relationship("User", back_populates="owner_boards")
