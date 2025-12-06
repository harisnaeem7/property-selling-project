import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import User from "../models/Users";
import { AuthenticatedRequest } from "./authorization";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];

  if (
    !authorizationHeader ||
    !(authorizationHeader as string)?.startsWith("Bearer ")
  )
    return res.status(401).json({ message: "Not Authorized " });

  const token = (authorizationHeader as string).split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const existingUser = await User.findById((decoded as any).id);

    if (!existingUser) {
      return res.status(401).json({ message: "User does not exists!" });
    }

    (req as AuthenticatedRequest).user = existingUser;

    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
