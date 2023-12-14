# add this to imports for each migration at the top
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# add this at the end of the upgrade
if environment == "production":
    op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    op.execute(f"ALTER TABLE boards SET SCHEMA {SCHEMA};")
    op.execute(f"ALTER TABLE usersboards SET SCHEMA {SCHEMA};")
    op.execute(f"ALTER TABLE cards SET SCHEMA {SCHEMA};")
    op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")
    op.execute(f"ALTER TABLE userscards SET SCHEMA {SCHEMA};")
