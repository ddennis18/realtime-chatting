import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

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