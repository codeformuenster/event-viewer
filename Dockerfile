FROM node:8.2-alpine

# RUN yarn global add create-react-app

WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN yarn install

COPY ./public /usr/src/app/public
COPY ./src /usr/src/app/src
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]


# FROM giantswarm/caddy:0.10.4-slim
# COPY --from=0 /usr/src/app/build /var/www
