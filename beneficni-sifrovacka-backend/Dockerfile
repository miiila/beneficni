FROM node:18-slim

ENV NODE_ENV=production

WORKDIR /beneficni
COPY ./package.json ./package-lock.json ./

RUN npm install

COPY ./ .

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]
