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
import { verifyMFASecret } from "../controllers/verifyMFASecret";
import { generateKey } from "crypto";
import { generateMFASecret } from "../controllers/generateMFASecret";

const authRouter = express.Router();

authRouter.post("/register", validateRequest(RegisterDTO), registerUser);
authRouter.post("/login", validateRequest(LoginDTO), loginUser);
authRouter.post("/forgot", validateRequest(ResetDTO), forgotPassword);
authRouter.post("/reset/:token", resetPassword);
authRouter.post("/mfa/setup", generateMFASecret);
authRouter.post("/mfa/verify", verifyMFASecret);

export default authRouter;
