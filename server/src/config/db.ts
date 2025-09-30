// filepath: e:\backend-ts\src\config\db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI as string;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(uri);
    console.log("CONNECTED to MongoDB");
  } catch (error) {
    console.log("XError", error);
    process.exit(1);
  }
};

export default connectDB;