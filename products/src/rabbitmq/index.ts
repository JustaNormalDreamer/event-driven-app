import amqplib, { Channel, Connection } from 'amqplib'
import {appConfig} from '../config';
import { io } from '../index';

export class RabbitMQ {

    private static connection: Connection;

    private static channel: Channel;

    public static getConnection(): Connection {
        return RabbitMQ.connection;
    }

    public static getChannel(): Channel {
        return RabbitMQ.channel;
    }

    public static async connect() {
        try {
            RabbitMQ.connection = await amqplib.connect(appConfig.rabbitmqHost);
            RabbitMQ.channel = await RabbitMQ.connection.createChannel();

            await RabbitMQ.channel.assertQueue('product');

            await RabbitMQ.channel.consume('product', (data) => {
                console.log(`Received order: ${data.content.toString()}`);
                RabbitMQ.channel.ack(data!);
                const message = JSON.parse(data.content.toString());
                if(message.priority >= 7) {
                    io.emit('message', data.content.toString());
                }
            }); 

        } catch(error) {
            console.log("Something went wrong with the RabbitMQ server.", error);
        }
    }
}