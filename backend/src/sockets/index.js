import createIO from "../config/socket.js";
import roomSocket from "./room-socket.js";
import messageSocket from "./message-socket.js";

export default function setupSockets(server) {
  const io = createIO(server);

  io.on("connection", function (socket) {
    console.log("A User Connected", socket.id);

    roomSocket(io, socket);

    messageSocket(io, socket);

    socket.on("disconnect", (data) => {
      console.log(`User Dusconnected ${socket.id} ${data}`);
    });
  });
}
