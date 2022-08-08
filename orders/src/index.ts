import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import {appConfig} from './config';
import { RabbitMQ } from './rabbitmq';
import { generateRandomNumber, generateRandomPhrase } from './utils';

dotenv.config();

const app: Express = express();

app.use(express.json());

RabbitMQ.connect();

app.get('/', (req: Request, res: Response) => {
 res.send('Echo World!!');
});

app.get('/mq', (req: Request, res: Response) => {
    const message = {
        priority: generateRandomNumber(),
        message: generateRandomPhrase(),
        timestamp: new Date().toISOString(),
    };

    RabbitMQ.getChannel().sendToQueue('product', Buffer.from(JSON.stringify(message)));
    res.send("Message sent to RabbitMQ server.");
});

app.listen(appConfig.appPort, () => {
    console.log(`Server started on port ${appConfig.appPort}`);
});