FROM node:12.17-alpine3.10
WORKDIR /usr/src/node-mq-app
COPY package.json /usr/src/node-mq-app/
RUN npm install
COPY . /usr/src/node-mq-app
EXPOSE 12346
CMD ["node", "src/index"]