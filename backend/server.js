import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { Server } from "socket.io";
import { allowedOrigins } from "./configs/allowedOrigins.js";
import connectDB from "./db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

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
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  })
);

/* Middleware for parsing URL-encoded bodies */
app.use(
  urlencoded({
    extended: true,
  })
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
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    optionSuccessStatus: 200,
    "Access-Control-Allow-Origin": allowedOrigins,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  },
});

const onlineUsers = new Map();

const emitOnlineUsers = () => {
  io.emit('online users', Array.from(onlineUsers.values()));
};


io.on("connection", (socket) => {
  socket.on('setup', (userData) => {
    onlineUsers.set(userData._id, userData);
    socket.join(userData._id);
    socket.emit('connected');
    emitOnlineUsers(); // Emit updated list of online users
  });

  socket.on("join chat", ({ user, room }) => {
    socket.join(room._id);
    console.log(user.name + " Joined Room: " + room._id);
  });

  socket.on("typing", ({ room, user }) => {
    // console.log(room._id + " has started typing.");
    socket.in(room._id).emit("typing", { room, user });
  });

  socket.on("stop typing", ({ room, user }) => {
    // console.log(room._id + " stopped typing.");
    socket.in(room._id).emit("stop typing", { room, user });
  });

  socket.on("new message", ({ newMessage }, callback) => {
    const chat = newMessage.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;

      socket.in(user._id).emit("message received", { room: chat, newMessage });
      callback();
    });
  });

   // Handle disconnections
   socket.on('disconnect', () => {
    // Remove the user from the online users map
    for (let [userId, user] of onlineUsers) {
      if (user.socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    emitOnlineUsers(); // Emit updated list of online users
  });

  // Handle setup off (used if the user setup event is canceled)
  socket.on('setup off', (userData) => {
    socket.leave(userData._id);
    onlineUsers.delete(userData._id);
    emitOnlineUsers(); // Emit updated list of online users
  });
});
