import express from "express";
import { Request, Response } from "express";
import { verifyToken } from "../middleware/protectedroutes";
import { UserController } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.get("/me", verifyToken, UserController);

export default userRoutes;
