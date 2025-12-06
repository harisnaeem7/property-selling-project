import express from "express";
import { Request, Response } from "express";
import { verifyToken } from "../middleware/protectedroutes";
import { authorizaton } from "../middleware/authorization";

const dashboardRoute = express.Router();

dashboardRoute.get(
  "/dashboard",
  verifyToken,
  authorizaton(["admin", "buyer"]),
  (req: Request, res: Response) => {
    return res.status(404).json({ message: "Dashboard route called" });
  }
);

export default dashboardRoute;
