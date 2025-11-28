import express, { NextFunction, Request, Response } from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/authController";
import { RegisterDTO } from "../dtos/registerDTO";
import { validateRequest } from "../middleware/validate";
import { LoginDTO } from "../dtos/loginDTO";
import { ResetDTO } from "../dtos/resetDTO";

const authRouter = express.Router();

authRouter.post("/register", validateRequest(RegisterDTO), registerUser);
authRouter.post("/login", validateRequest(LoginDTO), loginUser);
authRouter.post("/forgot", validateRequest(ResetDTO), forgotPassword);
authRouter.post("/reset/:token", resetPassword);

export default authRouter;
