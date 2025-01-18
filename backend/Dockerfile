FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .env.development .env

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "server"]