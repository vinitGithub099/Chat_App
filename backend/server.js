import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { json, urlencoded } from "express";
import { allowedOrigins } from "./configs/allowedOrigins.js";
import connectDB from "./db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import socketManager from "./sockets/socketManager.js";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  }),
);

app.get("/health", (req, res) => res.status(200).send("OK"));

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  socketManager.init(
    server,
    allowedOrigins,
    process.env.NODE_ENV === "development",
  );
};

startServer();
