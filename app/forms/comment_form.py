from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    comment_text = StringField('Comment', validators=[DataRequired(), Length(max=1000)])
    submit = SubmitField('Submit')