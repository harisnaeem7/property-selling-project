import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = (res: Response, req: any, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "Not Authorized" });

  const token = header.split("")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
  } catch (err: any) {
    return res.status(500).json({ message: "Invalid Token" });
  }
};

export default auth;
