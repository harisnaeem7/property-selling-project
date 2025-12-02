import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { NextFunction, Request, Response } from "express";
import User from "../models/Users";

export const generateMFASecret = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const checkUser = await User.findById({ userId });
  if (!checkUser) {
    return res.status(401).json({ message: "User not found" });
  }

  const secretKey = await speakeasy.generateSecret({
    name: `Real-estate ${checkUser.email}`,
  });

  checkUser.googleAuthSecret = secretKey.base32;
  checkUser.save();
  if (!secretKey.otpauth_url) {
    return res.status(500).json({ message: "Unable to generate QR Code" });
  }
  const qr = await QRCode.toDataURL(secretKey.otpauth_url);

  res.json({
    qrCode: qr,
    secret: secretKey.base32, // optional
  });
};
