from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class ListForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=20)])
    board_id = IntegerField('Board Id', validators=[DataRequired()])
    submit = SubmitField('Submit')