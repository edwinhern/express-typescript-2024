FROM node:21.5.0

# Create app directory
WORKDIR /usr/src/app

# Install global dependencies
RUN npm install -g nodemon typescript

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD npm run start
