import express, { NextFunction, Request, Response } from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
} from "../controllers/authController";
import { RegisterDTO } from "../dtos/registerDTO";
import { validateRequest } from "../middleware/validate";
import { LoginDTO } from "../dtos/loginDTO";
import { ResetDTO } from "../dtos/resetDTO";

const authRouter = express.Router();

authRouter.post("/register", validateRequest(RegisterDTO), registerUser);
authRouter.post("/login", validateRequest(LoginDTO), loginUser);
authRouter.post("/reset", validateRequest(ResetDTO), forgotPassword);

export default authRouter;
