from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length, Email

class UserForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(), Length(max=64)] )
    first_name = StringField("first_name", validators=[DataRequired(), Length(max=64)] )
    last_name = StringField("last_name", validators=[DataRequired(), Length(max=64)] )
    email = StringField("username", validators=[DataRequired(), Length(max=64), Email()] )
    hashed_password = StringField("password", validators=[DataRequired(), Length(max=255)] )
