FROM node:21.5.0

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install global and app dependencies
RUN npm install -g nodemon typescript
RUN npm install

# Bundle app source
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD npm run start
