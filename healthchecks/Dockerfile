FROM ubuntu:22.04

RUN apt-get update \
    && apt-get install -y \
        redis-tools \
        postgresql-client \
        iputils-ping \
        dnsutils \
        curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home

COPY . .

ENTRYPOINT [ "bash" ]

CMD ["./script_run.sh"]