import { Response } from "express";

export const dashboardRoute = (req: any, res: Response) => {
  return res.json({ message: "testing dashboard route!" });
};
