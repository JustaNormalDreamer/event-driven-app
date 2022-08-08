
const {
    APP_PORT,
    RABBITMQ_HOST,
    SOCKET_PORT,
} = process.env;

export const appConfig = {
    appPort: parseInt(APP_PORT) || 8004,
    rabbitmqHost: RABBITMQ_HOST || 'amqp://localhost:5672',
    socketPort: parseInt(SOCKET_PORT) || 8005,
};