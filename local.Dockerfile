# Development Dockerfile used with docker-compose 
FROM node:current-slim

WORKDIR /app

# Copy package.json and package-lock.json files first
COPY package*.json ./

# Install global and app dependencies
RUN npm install -g typescript tsx
RUN npm install

# Bundle app source
COPY . .

RUN chmod +x /app/scripts/docker/local-run.sh

EXPOSE 8080