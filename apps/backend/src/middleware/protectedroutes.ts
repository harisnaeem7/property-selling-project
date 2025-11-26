import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  console.log("called");
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "Not Authorized " });

  const token = header.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
