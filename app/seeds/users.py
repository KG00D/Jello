from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
import bcrypt
import os

password = os.environ.get('DEMO_USER_PASSWORD')
if not password:
    raise ValueError("No password set for demo user in environment variables")

bytes = password.encode('utf-8')
salt = bcrypt.gensalt()
# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io',
        username='demo',
        first_name="Demo",
        last_name="Demo",
        hashed_password='password'
        )
    will = User(
        email='will@will.io',
        username='will',
        first_name='Will',
        last_name='Duffy',
        password='password'
        )
    zaviar = User(
        email='zaviar@zaviar.io',
        username='zaviar',
        first_name='Zaviar',
        last_name='Brown',
        password='password'
        )

    db.session.add(demo)
    db.session.add(will)
    db.session.add(zaviar)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
