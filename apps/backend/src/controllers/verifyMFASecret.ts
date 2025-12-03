import { Request, Response } from "express";
import speakeasy from "speakeasy";
import User from "../models/Users";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const verifyMFASecret = async (req: AuthRequest, res: Response) => {
  const code = req.body.token;

  if (!code) {
    return res.status(400).json({ message: "Token required" });
  }
  console.log(code);
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ message: "Invalid ID." });
  }
  const user = await User.findById(userId);

  if (!user || !user.googleAuthSecret) {
    return res.status(400).json({ message: "Setup not started" });
  }

  const isValid = speakeasy.totp.verify({
    secret: user.googleAuthSecret,
    encoding: "base32",
    token: code,
    window: 2,
  });
  if (!isValid) {
    return res.status(400).json({ message: "Invalid authentication code" });
  }

  user.isMfaEnabled = true;
  await user.save();

  return res.json({ message: "MFA enabled successfully!" });
};
