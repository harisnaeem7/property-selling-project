import express, { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { verifyToken } from "../middleware/protectedroutes";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
