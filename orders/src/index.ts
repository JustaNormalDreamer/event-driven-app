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
    setTimeout(() => {
        for(let i=0; i<20; i++) {
            const message = {
                priority: generateRandomNumber(),
                message: generateRandomPhrase(),
                timestamp: new Date().toISOString(),
            };

            RabbitMQ.getChannel().sendToQueue('product', Buffer.from(JSON.stringify(message)));
        }
    }, 1000);
    res.send("Message sent to RabbitMQ server.");
});

app.listen(appConfig.appPort, () => {
    console.log(`Server started on port ${appConfig.appPort}`);
});