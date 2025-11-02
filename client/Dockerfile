FROM node:16.15.1-alpine3.16

ARG NODE_ENV="development"

RUN mkdir -p ./client

WORKDIR /client

COPY package*.json ./

COPY . .

EXPOSE 5000

RUN npm install --network-timeout=600000

RUN chown -R node:node /client/node_modules

CMD npm start
