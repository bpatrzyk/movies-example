FROM node:12-alpine

ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]
EXPOSE 3000
