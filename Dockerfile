FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-slim

RUN groupadd -r appuser && useradd -r -g appuser --no-create-home --shell /bin/false appuser

WORKDIR /app

COPY --from=builder /app .

RUN npm i -g serve

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 5173

CMD [ "serve", "-s", "dist", "-l", "5173" ]