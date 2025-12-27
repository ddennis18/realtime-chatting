import http from "http";
import setupSockets from "./sockets/index.js";
import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

setupSockets(server);

server.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`);
});
