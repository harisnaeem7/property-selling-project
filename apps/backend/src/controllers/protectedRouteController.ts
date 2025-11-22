import express from "express";
import User from "../models/Users";
import { Response } from "express";
const authUserRouter = express.Router();

const authUser = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default authUserRouter.get("/", authUser);
