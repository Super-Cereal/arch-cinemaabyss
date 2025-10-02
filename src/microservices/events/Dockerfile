FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache --virtual .build-deps \
    python3 \
    make \
    g++ \
    bash \
    openssl-dev \
    librdkafka-dev \
    && npm install \
    # && apk del .build-deps \
    && npm cache clean --force

COPY . .

CMD ["npm", "start"]