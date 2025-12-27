import express from "express";
import userRouter from "./user-route.js";
import groupRouter from "./group-route.js";

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/group", groupRouter);

export default apiRouter;
