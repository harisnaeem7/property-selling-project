import express, { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { verifyToken } from "../middleware/protectedroutes";
import { RegisterDTO } from "../dtos/registerDTO";
import { validateRequest } from "../middleware/validate";
import { LoginDTO } from "../dtos/loginDTO";

const authRouter = express.Router();

authRouter.post("/register", validateRequest(RegisterDTO), registerUser);
authRouter.post("/login", validateRequest(LoginDTO), loginUser);

export default authRouter;
