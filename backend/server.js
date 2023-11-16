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

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    optionSuccessStatus: 200,
    "Access-Control-Allow-Origin": [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    console.log(userData.name + " connected --- socketId: " + socket.id);
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", ({ user, room }) => {
    socket.join(room._id);
    console.log(user.name + " Joined Room: " + room._id);
  });

  // socket.on("typing", (room) => socket.in(room).emit("typing"));

  // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", ({ newMessage }) => {
    // var chat = message.chat;
    /* const room = newMessage.chat;
    console.log(
      newMessage.sender.name,
      " sent a message: ",
      newMessage.content + "in room " + room._id
    );

    socket.in(room._id).emit("message received", { room, newMessage }); */

    const chat = newMessage.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;

      socket.in(user._id).emit("message received", { room: chat, newMessage });
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
