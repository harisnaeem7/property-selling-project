import { Request, Response } from "express";
import { Property } from "../models/Property";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../utils/s3";
import { v4 as uuid } from "uuid";
interface AuthRequest extends Request {
  user?: { id: string };
}

export const createProperty = async (req: AuthRequest, res: Response) => {
  const {
    ownerId,
    title,
    price,
    purpose,
    propertyType,
    bedrooms,
    bathrooms,
    utilities,
    address,
    city,
    description,
    images,
    status,
    createdAt,
    updatedAt,
  } = req.body || {};

  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No images uploaded" });
  }

  if (
    !title ||
    !price ||
    !purpose ||
    !propertyType ||
    !bedrooms ||
    !bathrooms ||
    !utilities ||
    !address ||
    !city ||
    !description
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const uploadedImageKeys: string[] = [];

    for (const file of files) {
      const fileExtension = file.mimetype.split("/")[1]; // jpeg, png, etc
      const fileKey = `properties/${uuid()}.${fileExtension}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      uploadedImageKeys.push(fileKey);
    }
    const property = await Property.create({
      ownerId: req.user?.id,
      title,
      price,
      purpose,
      propertyType,
      bedrooms,
      bathrooms,
      utilities,
      address,
      city,
      description,
      images: uploadedImageKeys,
      status,
      createdAt,
      updatedAt,
    });
    return res.status(200).json({
      message: "Property successfully created!",
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
