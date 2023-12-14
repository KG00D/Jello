from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    wish_list = Board(
        name='Wish List',
        is_public=True,
        background_image="red",
        user_id=1
        )
    gift_ideas = Board(
        name='Gift Ideas',
        is_public=False,
        background_image="orange",
        user_id=2
        )
    chores = Board(
        name='Chores',
        is_public=False,
        background_image="yellow",
        user_id=3
        )
    group_project = Board(
        name='Group Project',
        is_public=True,
        background_image="green",
        user_id=3
        )

    db.session.add(wish_list)
    db.session.add(gift_ideas)
    db.session.add(chores)
    db.session.add(group_project)
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
