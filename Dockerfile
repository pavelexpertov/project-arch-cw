FROM node:8.6

COPY . /app

WORKDIR /app

RUN npm install

WORKDIR /app/vue-ui

RUN npm install

RUN npm run build

WORKDIR /app

ENV DB_TARGET=mydb

ENTRYPOINT ["npm", "start"]
