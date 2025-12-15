import { Response, Request } from "express";
import User from "../models/Users";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const UserController = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const user = await User.findById(userId).select(
    "firstName lastName email role, _id, isMfaEnabled"
  );

  return res.status(200).json({ user });
};
