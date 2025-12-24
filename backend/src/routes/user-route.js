import express from "express";
import { createUserController } from "../controllers/user-controllers.js";

const userRouter = express.Router();

userRouter.post("/new", createUserController);

export default userRouter;
