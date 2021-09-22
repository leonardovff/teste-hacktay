FROM node:14-alpine AS build

WORKDIR /app
# Install dependencies and build aplication
COPY ./package*.json ./
RUN npm ci
COPY . /app
RUN npm run nxbuild api

FROM node:14-alpine

COPY --from=build /app/dist/apps/api /app/dist/apps/api
COPY ./package*.json ./
RUN npm ci --production

EXPOSE 3000

CMD ["node", "/app/dist/apps/api/main.js"]
