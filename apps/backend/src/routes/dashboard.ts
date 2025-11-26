import express from "express";
import { Request, Response } from "express";

const dashboardRoute = express.Router();

dashboardRoute.get("/dashboard", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Dashboard route called" });
});

export default dashboardRoute;
