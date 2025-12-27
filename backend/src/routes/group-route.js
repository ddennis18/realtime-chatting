import express from "express";
import {
  createGroupController,
  getGroupController,
  editGroupController,
  deleteGroupController,
} from "../controllers/group-controllers.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const groupRouter = express.Router();

groupRouter.post("/new", verifyToken, createGroupController);
groupRouter.post("/edit/:id", verifyToken, editGroupController);
groupRouter.delete("/:id", verifyToken, deleteGroupController);
groupRouter.get("/:id", getGroupController);

export default groupRouter;
