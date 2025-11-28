import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { sendEmail } from "../services/emailServices";
import User from "../models/Users";

const createToken = (id: string) => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "2m" }
  );

  return token;
};

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
      const token = createToken(user._id.toString());

      try {
        await sendEmail({
          to: email,
          subject: "Welcome to Real Estate Platform",
          html: `
        <h2>Welcome, ${firstName}!</h2>
        <p>Your account has been successfully created.</p>
        <p>You can now start listing and selling properties.</p>
      `,
        });
      } catch (err: any) {
        return res.status(403).json(err);
      }
      console.log("new token is here: ", token);

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
      const isMatching = await bcrypt.compare(password, existingUser.password);
      const role = existingUser.role;
      const firstName = existingUser.firstName;
      const lastName = existingUser.lastName;
      const id = existingUser._id;
      if (!isMatching) {
        return res.status(401).json({ message: "Invalid email or password." });
      } else {
        const token = createToken(existingUser._id.toString());
        return res.status(200).json({
          message: "User found",
          token,
          email,
          id,
          role,
          firstName,
          lastName,
        });
      }
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body || {};

  if (!email) {
    return res.status(401).json({ message: "Please enter a valid email" });
  }

  const checkUser = await User.findOne({ email });

  if (!checkUser) {
    return res.status(404).json({ message: "Email not found!" });
  }

  try {
    await sendEmail({
      to: email,
      subject: "Reset Password",
      html: `<h2>Reset password</h2>
        <p>To reset your password, click <a href="${process.env.API_URL}/reset">here</a></p> `,
    });
  } catch (err: any) {
    return res.status(403).json(err);
  }

  return res
    .status(200)
    .json({ message: "Email to reset your password has been sent." });
};
