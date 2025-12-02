import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "seller" | "buyer";
  phone?: string;
  createdAt: Date;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  googleAuthSecret?: string;
  isMfaEnabled: boolean;
}
const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true, description: "First Name" },
  lastName: { type: String, required: true, description: "Last Name" },
  email: {
    type: String,
    required: true,
    description: "User Email",
    unique: true,
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "seller", "buyer"], default: "buyer" },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  googleAuthSecret: { type: String },
  isMfaEnabled: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
