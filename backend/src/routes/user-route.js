import express from "express";
import {
  createUserController,
  getUserController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
  searchUsersController,
} from "../controllers/user-controllers.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const userRouter = express.Router();

userRouter.post("/new", createUserController);
userRouter.get("/me", verifyToken, getUserController);
userRouter.get("/refresh", refreshTokenController);
userRouter.post("/login", loginUserController);
userRouter.post("/logout", logoutUserController);
userRouter.get("/search", verifyToken, searchUsersController);

export default userRouter;
