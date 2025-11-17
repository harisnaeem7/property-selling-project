import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("MongoDB connection unsuccessfull!");
  }
};

module.exports = connectDB;
