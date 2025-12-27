import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user-route.js";
import groupRouter from "./routes/group-route.js";
import messageRouter from "./routes/message-route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
app.use("/api/message", messageRouter);

//404 middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

//simple error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

export default app;
