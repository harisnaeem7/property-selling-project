import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/Users";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role, phone, createdAt } =
      req.body || {};

    if (!firstName || !lastName || !email) {
      return res
        .status(401)
        .json({ message: "Please fill all the required fields." });
    }
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        phone,
        createdAt: new Date(),
      });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({ message: `User with email ${email} created successfully!` });
    } else {
      return res
        .status(401)
        .json({ message: `User with email ${email} already exists!` });
    }
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};

    const existingUser = await User.findOne({ email });
    if (existingUser) {
    } else {
      return res
        .status(401)
        .json({ message: "Please enter valid email or password." });
    }
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
