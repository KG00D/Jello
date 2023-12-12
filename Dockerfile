FROM python:3.11.3-slim

RUN apt-get update && apt-get upgrade -y \
    && apt-get install --no-install-recommends -y -q \
    git && apt-get clean && pip install pipenv

WORKDIR $PYSETUP_PATH


COPY requirements.txt ./
RUN pipenv install -r requirements.txt 

ADD . /usrc/src/app