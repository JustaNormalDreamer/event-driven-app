## Event Driven Application

### Introduction

An event driven application created using Nodejs and Express. The application is a microservice architecture which uses RabbitMq for internal communication between each service. The frontend is created using ReactJs and is interacted with socket.io for real time communication.

### Modules

- Fronted: ReactJs
- Backend: NodeJs, Express, RabbitMq
- - Products
- - Orders

### Project Setup

- Clone the repository.
- Install dependencies of each modules by going to the respective modules e.g. `cd orders`, `cd products` and `cd fe`. Then run `npm install` in each of them.
- Run the application by using `npm run dev` for both orders and products modules while `npm start` for the frontend.
- Now the fe application can be accessed at `http://localhost:3000`.
- The backend can be accessed at `http://localhost:8001` and `http://localhost:8004` for products and orders respectively.
- For firing an event, go to `http://localhost:8001/mq` and `http://localhost:8004/mq` respectively.

### Running via Docker

- Clone the repository.
- Run `docker-compose build` to build the application images.
- Run `docker-compose up -d` to start the containers in detached mode.
- Run `docker-compose stop` to stop the containers.
- Run `docker-compose down` to stop and remove the containers.
- Now the fe application can be accessed at `http://localhost:8081`.
- The backend can be accessed at `http://localhost:8081` and `http://localhost:8082` for products and orders respectively.
- For firing an event, go to `http://localhost:8081/mq` and `http://localhost:8082/mq` respectively.
