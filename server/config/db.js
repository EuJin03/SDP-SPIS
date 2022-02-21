import mongoose from "mongoose";
import { __mongo_uri } from "../constant.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(__mongo_uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
