const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connectionString, {
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

module.exports = connectDB;
