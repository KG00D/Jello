from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo list, you can add other lists here if you want
def seed_list():
    clothes = List(
        title='Clothes',
        board_id=1
        )
    toys = List(
        title='Toys',
        board_id=1
        )
    mom = List(
        title='Mom',
        board_id=2
        )
    dad = List(
        title='Dad',
        board_id=2
        )
    kitchen = List(
        title='Kitchen',
        board_id=3
        )
    family_room = List(
        title='Family Room',
        board_id=3
        )
    upstairs = List(
        title='Dad',
        board_id=3
        )
    models = List(
        title='Models',
        board_id=4
        )
    seeds = List(
        title='Seeds',
        board_id=4
        )
    forms = List(
        title='Forms',
        board_id=4
        )

    db.session.add(clothes)
    db.session.add(toys)
    db.session.add(mom)
    db.session.add(dad)
    db.session.add(kitchen)
    db.session.add(family_room)
    db.session.add(upstairs)
    db.session.add(models)
    db.session.add(seeds)
    db.session.add(forms)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the lists table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
