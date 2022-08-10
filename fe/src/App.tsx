import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./style.css";

const socket = io("http://localhost:8001");

interface Message {
  priority: number;
  message: string;
  timestamp: Date;
}

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      setIsConnected(false);
    });

    socket.on("message", (newMessage) => {
      console.log(newMessage);
      const m = JSON.parse(newMessage);
      setMessage((prev) => [...prev, m]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    console.log("Message sent");
    socket.emit("message", "hello");
  };

  return (
    <>
      <h2 className="">Hello World!</h2>
      <h3>{isConnected ? "Connected" : "Disconnected"}</h3>
      <button onClick={() => sendMessage()}>Send Message</button>
      <h3 className="">Messages:</h3>
      {message.length > 0 &&
        message.map((message, index) => (
          <div key={index} className="box">
            <h3>Message: {message.message}</h3>
            <p>Priority: {message.priority}</p>
            <h4 className="">{message.timestamp.toString()}</h4>
          </div>
        ))}
    </>
  );
};

export default App;
