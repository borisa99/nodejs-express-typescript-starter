FROM node:16-alpine3.15 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json /app/

RUN npm i

COPY . .

RUN npm run build

RUN ls

CMD node -r tsconfig-paths/register -r ts-node/register dist/src/index.js