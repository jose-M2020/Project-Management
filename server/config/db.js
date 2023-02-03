import mongoose from 'mongoose';
import { config } from "dotenv";
import colors from 'colors';

config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;