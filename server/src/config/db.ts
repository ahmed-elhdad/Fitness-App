// filepath: e:\backend-ts\src\config\db.ts
import { Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI as string).then((res) => {
      console.log("Connected to MongoDB");
    });
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("Error:", err);
    process.exit(1);
  }
};

export default connectDB;
