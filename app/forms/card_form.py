from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class CardForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=64)])
    description = StringField('Description', validators[DataRequired(), Length(max=1000)])
    list_id = IntegerField('List Id', validators=[DataRequired()])
    submit = SubmitField('Submit')
