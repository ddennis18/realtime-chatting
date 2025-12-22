import { Server } from "socket.io";

// basically creates a socket.io server
export default function createIO(server) {
  return new Server(server);
}