from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    comment_text = StringField('Comment', validators=[DataRequired(), Length(max=1000)])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    card_id = IntegerField('Card Id', validators=[DataRequired()])
    submit = SubmitField('Submit')
