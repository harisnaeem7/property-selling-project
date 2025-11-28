import { Response, Request } from "express";
import User from "../models/Users";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const UserController = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  console.log(userId);
  const user = await User.findById(userId).select(
    "firstName lastName email role -_id"
  );
  console.log(user);

  return res.status(200).json({ message: "testing dashboard route!", user });
};
