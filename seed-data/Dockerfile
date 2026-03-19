FROM python:3

RUN apt-get update \
    && apt-get install -y apache2-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

ENV FRONTEND_HOST=frontend

ENV FRONTEND_PORT=5000

RUN [ "python", "make-data.py" ]

CMD [ "bash" , "generate-votes.sh" , "${FRONTEND_HOST}:${FRONTEND_PORT}" ]
