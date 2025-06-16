FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=build /app ./
RUN npm install --production

EXPOSE 1337

CMD ["npm", "run", "start"]
