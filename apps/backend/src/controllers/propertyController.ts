import { Request, Response } from "express";
import { Property } from "../models/Property";

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

  // if (
  //   !title ||
  //   !price ||
  //   !purpose ||
  //   !propertyType ||
  //   !bedrooms ||
  //   !bathrooms ||
  //   !utilities ||
  //   !address ||
  //   !city ||
  //   !description ||
  //   !images ||
  //   !status
  // ) {
  //   return res.status(400).json({ message: "Missing required fields" });
  // }

  try {
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
      images,
      status,
      createdAt,
      updatedAt,
    });
  } catch (err) {
    return res.status(403).json({ message: err });
  }

  return res.status(200).json({ message: "property created successfully!" });
};
