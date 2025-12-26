import express from "express";
import cors from "cors";
import apiRouter from "./routes/api-route.js";
import cookieParser from 'cookie-parser'
import Group from './models/Group.js'

const app = express();

app.use(cookieParser());
app.use(express.json())
app.use(cors());

app.use('/api', apiRouter)

//simple 404 middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

//simple error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

export default app