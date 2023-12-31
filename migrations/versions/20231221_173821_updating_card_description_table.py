"""updating card description table

Revision ID: 4214fc9fbb69
Revises: 5ec3d7798050
Create Date: 2023-12-21 17:38:21.866659

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4214fc9fbb69'
down_revision = '5ec3d7798050'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(),
               type_=sa.Text(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###
