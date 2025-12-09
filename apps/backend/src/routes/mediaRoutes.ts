import express from "express";
import { generatePresignedUrl } from "../controllers/mediaController";

export const mediaRoutes = express.Router();

mediaRoutes.get("/presigned-url", generatePresignedUrl);
