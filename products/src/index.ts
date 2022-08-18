import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import {appConfig} from './config';
import { RabbitMQ } from './rabbitmq';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config();

const app: Express = express();

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));

app.use(express.json());

RabbitMQ.connect();

export const io = new Server(appConfig.socketPort, { cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
} });

io.on("connect", (socket) => {
    console.log("Connection to the socket has been established.");
    socket.on("message", (arg) => {
        console.log("Message received.");
    });

    socket.on("disconnect", (arg) => {
        console.log("Disconnected from the socket.");
    })
});

// app.get('/', (req: Request, res: Response) => {
//  res.send('Echo World!!');
// });

// app.get('/mq', (req: Request, res: Response) => {
//     RabbitMQ.getChannel().sendToQueue('order', Buffer.from('Hello World!'));
//     res.send("Message sent to RabbitMQ server.");
// });

app.listen(appConfig.appPort, () => {
    console.log(`Server started on port ${appConfig.appPort}`);
});