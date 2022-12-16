FROM node:18

# Create app directory
WORKDIR /usr/src/backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production

# Install nodemon
RUN npm install nodemon forever -g

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "forever", "-o", "out.log", "-e", "err.log", "app.js" ]
