import amqplib, { Channel, Connection } from 'amqplib'
import {appConfig} from '../config';

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

            await RabbitMQ.channel.assertQueue('order');

            await RabbitMQ.channel.consume('order', (data) => {
                console.log(`Received order: ${data.content.toString()}`);
                RabbitMQ.channel.ack(data!);
            }); 
        } catch(error) {
            console.log("Something went wrong with the RabbitMQ server.", error);
        }
    }
}