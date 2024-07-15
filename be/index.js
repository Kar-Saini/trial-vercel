import { WebSocketServer } from "ws";

const socketServer = new WebSocketServer({ port: 8080 });

socketServer.on("connection", (socket) => {
  console.log("A user joined");
  socket.on("message", (data) => {
    const message = JSON.parse(data);
    if (message.type === "hello") {
      const name = message.payload.message;
      console.log("Name of the user :" + name);
      socket.send(JSON.stringify("Hello " + name));
    }
  });
});
