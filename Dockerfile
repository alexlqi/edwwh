# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app /app

RUN npm install --production

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
