FROM python:3.11.3-slim

RUN apt-get update && apt-get upgrade -y \
    && apt-get install --no-install-recommends -y -q \
    git && apt-get clean

WORKDIR $PYSETUP_PATH

