# FROM python:3.9.18-alpine3.18

# RUN apk add build-base

# RUN apk add postgresql-dev gcc python3-dev musl-dev

# # ARG FLASK_APP
# # ARG FLASK_ENV
# # ARG DATABASE_URL
# # ARG SCHEMA
# # ARG SECRET_KEY

# WORKDIR /var/www

# COPY requirements.txt .

# RUN pip install -r requirements.txt
# RUN pip install psycopg2

# COPY . .

# RUN flask db upgrade
# RUN flask seed all
# CMD gunicorn app:app

# FROM python:3.11.3-slim

# RUN apt-get update && apt-get upgrade -y \
#     && apt-get install --no-install-recommends -y -q \
#     git && apt-get clean && pip install pipenv && 

# WORKDIR $PYSETUP_PATH


# COPY requirements.txt ./
# RUN pipenv install -r requirements.txt 

# ADD . /usrc/src/app