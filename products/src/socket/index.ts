import { Server } from 'socket.io';
import {appConfig} from '../config';

export const io = new Server(appConfig.socketPort);

io.on("connect", (socket) => {
    console.log("Connection to the socket has been established.");
});

io.on("message", (socket) => {
    console.log("Message received from the socket.");
});