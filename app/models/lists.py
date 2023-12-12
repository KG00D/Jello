from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
#TODO Check this model?
from .board_model import db, Board 

class List(db.Model):
    __tablename__ = 'lists'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    boardid = db.Column(db.Integer, db.ForeignKey('boards.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, title, board):
        self.title = title
        self.board = board

