FROM node:10

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install
    # If building for production only
    # RUN npm ci --only=production 
COPY . .
COPY ./.env.docker ./.env

EXPOSE 1337

CMD [ "node", "server.js" ]

