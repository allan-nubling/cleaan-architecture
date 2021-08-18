FROM node:lts-alpine

WORKDIR /home/node/app

COPY package*.json babel.config.js ./

COPY src ./src

RUN yarn

RUN yarn build

EXPOSE 3000

CMD node ./build/server.js