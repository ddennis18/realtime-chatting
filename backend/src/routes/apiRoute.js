import express from "express"
import authRoute from "./authRoute.js";

const apiRouter = express.Router();

apiRouter.use('/user', authRoute)

export default apiRouter;