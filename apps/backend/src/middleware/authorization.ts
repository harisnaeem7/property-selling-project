import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/Users";

export interface AuthenticatedRequest extends Request {
  user: IUser;
}

export const authorizaton = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req as AuthenticatedRequest;
    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "User not authorized to perform this action" });
    }
    next();
  };
};
