import mongoose from "mongoose";
export interface IProperty {
  ownerId?: mongoose.Types.ObjectId | string;
  title: string;
  price: number;
  purpose: "rent" | "sale";
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  utilities: "water" | "heating" | "electricity" | "none";
  address: string;
  city: string;
  description: string;
  images: string[];
  status: "available" | "sold" | "rented" | "pending";
  createdAt?: Date;
  updatedAt?: Date;
}

export const propertySchema = new mongoose.Schema<IProperty>(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    purpose: {
      type: String,
      enum: ["rent", "sale"],
      required: true,
    },

    propertyType: {
      type: String,
      required: true,
    },

    bedrooms: {
      type: Number,
      required: true,
    },

    bathrooms: {
      type: Number,
      required: true,
    },

    utilities: {
      type: String,
      enum: ["water", "heating", "electricity", "none"],
      default: "none",
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "sold", "rented", "pending"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

export const Property = mongoose.model<IProperty>("Property", propertySchema);
