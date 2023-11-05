const cors = require("cors");
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");
require("dotenv").config();
const connectDB = require("./db");
const { Server } = require("socket.io");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
connectDB();

const PORT = process.env.PORT || 5050;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    // origin: "*",
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://127.0.0.1:5174",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    optionSuccessStatus: 200,
    "Access-Control-Allow-Origin": [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://127.0.0.1:5174",
      "http://localhost:5174",
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
const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
  },
});

io.on("connect", (socket) => {
  console.log("You are connected with socketId: ", socket.id);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData);
    socket.emit("connected");
  });

  socket.on("join group", (group) => {
    socket.join(group);
    console.log("User joined group: ", group);
  });

  socket.on("new message", (newMessage) => {
    const chat = newMessage.chat;
    console.log("new message received from: ", chat._id);
    if (!chat.users) return console.log("chat.users not defined");
    console.log("new message");
    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;
      socket.in(user._id).emit("message received", newMessage);
    });
  });

  io.emit("connected", () => {
    console.log("connected");
  });
});

// socket.emit  wrong
// io.emit correct
