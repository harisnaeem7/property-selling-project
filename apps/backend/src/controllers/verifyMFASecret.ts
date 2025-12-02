import { NextFunction, Request, Response } from "express";
import speakeasy from "speakeasy";
import User from "../models/Users";

export const verifyMFASecret = async (req: Request, res: Response) => {
  const { token, userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Invalid ID." });
  }
  const user = await User.findById({ userId });

  if (!user || !user.googleAuthSecret) {
    return res.status(400).json({ message: "Setup not started" });
  }

  const isValid = speakeasy.totp.verify({
    secret: user.googleAuthSecret,
    encoding: "base32",
    token,
  });
  if (!isValid) {
    return res.status(400).json({ message: "Invalid authentication code" });
  }

  user.isMfaEnabled = true;
  await user.save();

  return res.json({ message: "MFA enabled successfully!" });
};
