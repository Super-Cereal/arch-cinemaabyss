# Build stage
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum files
COPY . .

RUN npm install && npm cache clean --force

CMD ["npm", "start"]
