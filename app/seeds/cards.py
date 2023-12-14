from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    hat = Card(
        name='Hat',
        description='black beanie',
        list_id=1
        )
    sweatshirt = Card(
        name='Sweatshirt',
        description='crew neck with pockets',
        list_id=1
        )
    lego = Card(
        name='Lego',
        description='Star Wars Lego set',
        list_id=2
        )
    hotwheels = Card(
        name='Hotwheels',
        description=None,
        list_id=2
        )
    macaroni = Card(
        name='Macaroni Art',
        description='She\'ll love it',
        list_id=3
        )
    wine = Card(
        name='Wine bottle opener',
        description='Maybe add in some wine too',
        list_id=3
        )
    tie = Card(
        name='Tie',
        description='Classic',
        list_id=4
        )
    shoes = Card(
        name='NewBalance',
        description='Again, classic',
        list_id=4
        )
    dishes = Card(
        name='Dishes',
        description='Run the dishwasher',
        list_id=5
        )
    oven = Card(
        name='Clean the oven',
        description=None,
        list_id=5
        )
    vacuum = Card(
        name='Vacuum',
        description=None,
        list_id=6
        )
    tidy = Card(
        name='Tidy Up',
        description='Hide the junk in the closet',
        list_id=6
        )
    vacuum2 = Card(
        name='Vacuum',
        description=None,
        list_id=7
        )
    clothes = Card(
        name='Put clothes away',
        description=None,
        list_id=7
        )
    boards = Card(
        name='Create Boards model',
        description=None,
        list_id=8
        )
    lists = Card(
        name='Create Lists model',
        description=None,
        list_id=8
        )
    cards = Card(
        name='Create Cards model',
        description=None,
        list_id=8
        )
    boards2 = Card(
        name='Seed Boards model',
        description=None,
        list_id=9
        )
    lists2 = Card(
        name='Seed Lists model',
        description=None,
        list_id=9
        )
    cards2 = Card(
        name='Seed Cards model',
        description=None,
        list_id=9
        )
    boards3 = Card(
        name='Create Boards form',
        description=None,
        list_id=10
        )
    lists3 = Card(
        name='Create Lists form',
        description=None,
        list_id=10
        )
    cards3 = Card(
        name='Create Cards form',
        description=None,
        list_id=10
        )

    db.session.add(hat)
    db.session.add(sweatshirt)
    db.session.add(lego)
    db.session.add(hotwheels)
    db.session.add(macaroni)
    db.session.add(wine)
    db.session.add(tie)
    db.session.add(shoes)
    db.session.add(dishes)
    db.session.add(oven)
    db.session.add(vacuum)
    db.session.add(tidy)
    db.session.add(vacuum2)
    db.session.add(clothes)
    db.session.add(boards)
    db.session.add(lists)
    db.session.add(cards)
    db.session.add(boards2)
    db.session.add(lists2)
    db.session.add(cards2)
    db.session.add(boards3)
    db.session.add(lists3)
    db.session.add(cards3)
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
