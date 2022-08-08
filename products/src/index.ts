import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import {appConfig} from './config';
import { RabbitMQ } from './rabbitmq';
// import { io } from './socket';
import { Server } from 'socket.io';

dotenv.config();

const app: Express = express();

app.use(express.json());

RabbitMQ.connect();

const io = new Server(appConfig.socketPort);

io.on("connect", (socket) => {
    console.log("Connection to the socket has been established.");
});

io.on("message", (socket) => {
    console.log("Message received from the socket.");
});

app.get('/', (req: Request, res: Response) => {
 res.send('Echo World!!');
});

app.get('/mq', (req: Request, res: Response) => {
    RabbitMQ.getChannel().sendToQueue('order', Buffer.from('Hello World!'));
    res.send("Message sent to RabbitMQ server.");
});

app.listen(appConfig.appPort, () => {
    console.log(`Server started on port ${appConfig.appPort}`);
});