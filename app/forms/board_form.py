from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length

class BoardForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=64)])
    is_public = BooleanField('is_public')
    background_image = StringField("background_image", validators=[DataRequired(), Length(max=255)])
    user_id = IntegerField("user_id", validators=[DataRequired()])
