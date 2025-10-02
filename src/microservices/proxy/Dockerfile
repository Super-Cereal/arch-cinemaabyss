# Build stage
FROM node:24-alpine

# Set working directory
WORKDIR /app

COPY . .

RUN npm install && npm cache clean --force

CMD ["npm", "start"]
