FROM node

RUN apt-get update && apt install -y iputils-ping && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5001

CMD ["node", "server.js"]