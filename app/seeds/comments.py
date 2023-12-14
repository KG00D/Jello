from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    comment1 = Comment(
        comment_text='everyone loves a good hot wheel',
        user_id=3,
        card_id=3
        )
    comment2 = Comment(
        comment_text='seriously, that\'s a terrible idea',
        user_id=1,
        card_id=5
        )
    comment3 = Comment(
        comment_text='don\'t forget the inside too',
        user_id=2,
        card_id=10
        )
    comment4 = Comment(
        comment_text='only the clean clothes this time, pls',
        user_id=2,
        card_id=14
        )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
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
