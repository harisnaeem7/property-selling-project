import express from "express";
import { Request, Response } from "express";
import { verifyToken } from "../middleware/protectedroutes";
const userRoutes = express.Router();

const testData = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Invalid email or password." });
};

userRoutes.get("/me", verifyToken, testData);

export default userRoutes;
