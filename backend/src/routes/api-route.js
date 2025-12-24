import express from "express"
import authRoute from "./auth-route.js";

const apiRouter = express.Router();

apiRouter.use('/user', authRoute)

export default apiRouter;