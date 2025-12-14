import { Request, Response } from "express";
import { Property } from "../models/Property";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../utils/s3";
import { v4 as uuid } from "uuid";

export const createProperty = async (req: Request, res: Response) => {
  console.log(req.body);
  const {
    // ownerId,
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
    // !images ||
    // !status
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
    console.log(uploadedImageKeys);
    const property = await Property.create({
      //ownerId,
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
    return res.status(201).json({
      message: "Images uploaded successfully",
      images: uploadedImageKeys,
      body: req.body,
    });
  } catch (err: any) {
    console.error("🔥 FULL S3 ERROR 🔥");
    console.error(err);
    console.error("NAME:", err.name);
    console.error("MESSAGE:", err.message);
    console.error("METADATA:", err.$metadata);

    res.status(500).json({
      name: err.name,
      message: err.message,
      metadata: err.$metadata,
    });
  }

  return res.status(200).json({ message: "property created successfully!" });
};

export const testUpload = (req: Request, res: Response) => {
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  const files = req.files as Express.Multer.File[];

  return res.json({
    message: "Upload received",
    body: req.body,
    fileCount: files?.length || 0,
    files: files?.map((file) => ({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    })),
  });
};
