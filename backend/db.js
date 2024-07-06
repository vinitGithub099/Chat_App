import dotenv from "dotenv";
import { connect } from "mongoose";
dotenv.config();

const connectionString = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
