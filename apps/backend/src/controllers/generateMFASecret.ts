import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { NextFunction, Request, Response } from "express";
import User from "../models/Users";
interface AuthRequest extends Request {
  user?: { id: string };
}
export const generateMFASecret = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  console.log(userId);
  if (!userId) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const checkUser = await User.findById(userId);
  if (!checkUser) {
    return res.status(401).json({ message: "User not found" });
  }
  if (checkUser.googleAuthSecret) {
    const otpauthUrl = speakeasy.otpauthURL({
      secret: checkUser.googleAuthSecret,
      label: `Real-estate (${checkUser.email})`,
      encoding: "base32",
    });

    const qrCode = await QRCode.toDataURL(otpauthUrl);

    return res.json({
      qrCode,
      secret: checkUser.googleAuthSecret,
      alreadyExists: true,
    });
  }
  const secretKey = await speakeasy.generateSecret({
    name: `Real-estate ${checkUser.email}`,
  });

  if (!secretKey.otpauth_url) {
    return res.status(500).json({ message: "Unable to generate QR Code" });
  }
  checkUser.googleAuthSecret = secretKey.base32;
  await checkUser.save();

  const qr = await QRCode.toDataURL(secretKey.otpauth_url);

  res.json({
    qrCode: qr,
    secret: secretKey.base32,
  });
};
