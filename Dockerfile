FROM node:8.1-alpine

#RUN npm install -g create-react-app
RUN yarn global add create-react-app

WORKDIR /app

COPY package.json /app

RUN npm install --global
RUN yarn install

CMD ["yarn", "start"]

EXPOSE 3000
