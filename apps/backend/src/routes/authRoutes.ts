import express from "express";
import { Request, Response } from "express";
const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role, phone, createdAt } =
    req.body || {};

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(404)
      .json({ message: "Please fill all required fields." });
  }

  return res
    .status(200)
    .json({ message: "Data provided", firstName, lastName, email });
});

export default router;
