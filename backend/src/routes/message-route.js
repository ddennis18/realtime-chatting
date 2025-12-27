import express from "express";
import { getGroupMessagesController } from "../controllers/message-controllers.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const messageRouter = express.Router();

messageRouter.get("/:groupId", verifyToken, getGroupMessagesController);

export default messageRouter;
