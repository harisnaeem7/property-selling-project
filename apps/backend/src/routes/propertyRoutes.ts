import express from "express";
import { createProperty } from "../controllers/propertyController";
import { validateRequest } from "../middleware/validate";
import { createPropertyDTO } from "../dtos/property/createProperty";
import { verifyToken } from "../middleware/protectedroutes";

export const propertyRoutes = express.Router();

propertyRoutes.post(
  "/create-property",
  verifyToken,
  //  validateRequest(createPropertyDTO),
  createProperty
);
