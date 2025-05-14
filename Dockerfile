FROM node:23-alpine AS base
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


CMD ["npm", "run", "start"]
