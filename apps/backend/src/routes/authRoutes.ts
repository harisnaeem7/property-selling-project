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
import { verifyToken } from "../middleware/protectedroutes";
import { verifyMFALogin } from "../controllers/verifyMFALogin";
import { MFADTO } from "../dtos/MFADTO";

const authRouter = express.Router();

authRouter.post("/register", validateRequest(RegisterDTO), registerUser);
authRouter.post("/login", validateRequest(LoginDTO), loginUser);
authRouter.post("/forgot", validateRequest(ResetDTO), forgotPassword);
authRouter.post("/reset/:token", resetPassword);
authRouter.post("/mfa/setup", verifyToken, generateMFASecret);
authRouter.post(
  "/mfa/verify",
  verifyToken,

  verifyMFASecret
);
authRouter.post("/mfa/verify-login", verifyMFALogin);

export default authRouter;
