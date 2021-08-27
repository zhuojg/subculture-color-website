FROM node:alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

ENV NODE_ENV production

EXPOSE 3000

CMD ["yarn", "start"]
