FROM node:8.1-alpine

# RUN npm install -g create-react-app

WORKDIR /app

CMD ["yarn", "start"]

EXPOSE 3000
