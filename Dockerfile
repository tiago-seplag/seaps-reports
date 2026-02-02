FROM node:23-alpine AS base

# Instalar Python3 e dependências necessárias para WeasyPrint
RUN apk add --no-cache \
  python3 \
  py3-pip \
  py3-pillow \
  py3-cffi \
  py3-brotli \
  gcc \
  musl-dev \
  python3-dev \
  pango \
  cairo \
  cairo-dev \
  pango-dev \
  gdk-pixbuf \
  ttf-freefont \
  fontconfig \
  && rm -rf /var/cache/apk/*

WORKDIR /app

# Copiar e instalar dependências Python
COPY requirements.txt ./
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

# Copiar e instalar dependências Node.js
COPY package.json ./
RUN npm install

# Copiar resto do código
COPY . .

CMD ["npm", "run", "start"]
