from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class List(db.Model):
    __tablename__ = 'lists'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey('boards.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


