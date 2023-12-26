FROM node:21.5.0

WORKDIR /usr/src/app

RUN npm install -g typescript

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

#Build to project
RUN npm run build

ENV NODE_ENV production

# run node server
CMD npm run start
