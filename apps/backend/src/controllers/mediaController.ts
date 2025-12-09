import { Request, Response } from "express";
import { s3 } from "../utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";

export const generatePresignedUrl = async (req: Request, res: Response) => {
  console.log("Loaded Credentials:", {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretKeyLength: process.env.AWS_SECRET_ACCESS_KEY?.length,
  });

  try {
    const { fileType } = req.query;

    // Ensure fileType is exactly a string
    if (!fileType || typeof fileType !== "string") {
      return res.status(400).json({ message: "Missing or invalid fileType" });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(fileType)) {
      return res.status(400).json({ message: "File type not allowed" });
    }

    // Extract file extension from MIME
    const extension = fileType.split("/")[1];
    const fileKey = `properties/${uuid()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileKey,
      ContentType: fileType, // Now validated string
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    return res.json({
      uploadUrl,
      fileKey,
    });
  } catch (error) {
    console.error("Presigned URL error:", error);
    return res.status(500).json({ message: "Failed to generate upload URL" });
  }
};
