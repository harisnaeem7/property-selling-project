import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";
import { Response } from "express";
import User from "../models/Users";

export const verifyMFALogin = async (req: any, res: Response) => {
  const { code } = req.body;
  console.log(code);
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const tempJwt = authHeader.split(" ")[1];
  if (!tempJwt) {
    return res.status(401).json({ message: "Invalid temp token" });
  }
  let decoded: any;
  try {
    decoded = jwt.verify(tempJwt, process.env.JWT_SECRET!);
    req.user = decoded;
    console.log(decoded);
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "TEMP_TOKEN_EXPIRED" });
    }
  }

  if (!decoded.mfaStage) {
    return res.status(401).json({ message: "Invalid temp session" });
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isValid = speakeasy.totp.verify({
    secret: user.googleAuthSecret!,
    encoding: "base32",
    token: code,
    window: 2,
  });

  if (!isValid) return res.status(400).json({ message: "Invalid code" });

  const finalToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return res.json({ token: finalToken });
};
