import http from "http";
import setupSockets from './sockets/index.js'
import app from './app.js'

const PORT = 5000;

const server = http.createServer(app);

setupSockets(server)

app.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`);
});