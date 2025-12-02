import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { NextFunction, Request, Response } from "express";
import User from "../models/Users";

export const generateMFASecret = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    return res.status(401).json({ message: "User not found" });
  }

  const secretKey = await speakeasy.generateSecret({
    name: `Real-estate ${email}`,
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
