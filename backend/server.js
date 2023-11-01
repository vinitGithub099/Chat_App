const cors = require("cors");
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");
require("dotenv").config();
const connectDB = require("./db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
connectDB();

const PORT = process.env.PORT || 5050;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    // origin: "*",
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    optionSuccessStatus: 200,
    "Access-Control-Allow-Origin": [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  })
);
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
