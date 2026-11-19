import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { allowedOrigins } from "./configs/allowedOrigins.js";
import connectDB from "./db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import socketManager from "./sockets/socketManager.js";

const app = express();
dotenv.config();

/* Connect to the database */
connectDB();

/* Set the port */
const PORT = process.env.PORT || 5050;

/* Middleware for parsing cookies */
app.use(cookieParser());

/* Middleware for parsing JSON bodies */
app.use(json());

/* Middleware for handling CORS */
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    optionSuccessStatus: 200,
    "Access-Control-Allow-Origin": allowedOrigins,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
  }),
);

/* Middleware for parsing URL-encoded bodies */
app.use(
  urlencoded({
    extended: true,
  }),
);

/* Routes */
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

/* Error handling middleware */
app.use(notFound);
app.use(errorHandler);

/* Start the server */
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* Set up Socket.io */
socketManager.init(server, allowedOrigins, app.settings.env === "development");
