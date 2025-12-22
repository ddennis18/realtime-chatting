import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from 'cors'

const PORT = 5000;
const app = express();
app.use(cors())

//simple 404 middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

//simple error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

const server = http.createServer(app);
// pass the http server to socket.io
const io = new Server(server, {
  cors: {
    // the react server
    origin: "http://localhost:5173",
  },
});

server.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`);
});
