FROM node:14-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copying rest of the application to app directory
COPY . /app

RUN npm run build

# Expose the port and start the application
EXPOSE 8080

CMD ["npm","start"]