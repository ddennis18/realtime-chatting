import express from "express";
import { createUserController, getUserController } from "../controllers/user-controllers.js";

const userRouter = express.Router();

userRouter.post("/new", createUserController);
userRouter.post("/me", getUserController);

export default userRouter;
