import { Server } from "socket.io";

class SocketManager {
  constructor() {
    this.io = null;
    this.onlineUsers = new Map();
  }

  init(httpServer, allowedOrigins, isDevelopment = false) {
    this.io = new Server(httpServer, {
      pingTimeout: 60000,
      cors: {
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "PUT", "POST", "DELETE"],
        optionSuccessStatus: 200,
        "Access-Control-Allow-Origin": allowedOrigins,
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
      },
    });

    this.io.on("connection", (socket) => {
      this.registerEvents(socket, isDevelopment);
    });

    return this.io;
  }

  emitOnlineUsers() {
    if (!this.io) return;
    this.io.emit("online users", Array.from(this.onlineUsers.values()));
  }

  removeUserBySocketId(socketId) {
    for (const [userId, user] of this.onlineUsers.entries()) {
      if (user.socketId === socketId) {
        this.onlineUsers.delete(userId);
        return true;
      }
    }
    return false;
  }

  registerEvents(socket, isDevelopment) {
    socket.on("setup", (userData) => this.handleSetup(socket, userData));
    socket.on("join chat", (payload) =>
      this.handleJoinChat(socket, payload, isDevelopment),
    );
    socket.on("typing", (payload) => this.handleTyping(socket, payload));
    socket.on("stop typing", (payload) =>
      this.handleStopTyping(socket, payload),
    );
    socket.on("new message", (payload, callback) =>
      this.handleNewMessage(socket, payload, callback),
    );
    socket.on("disconnect", () => this.handleDisconnect(socket));
  }

  handleSetup(socket, userData) {
    const userId = userData?._id;
    if (!userId) return;

    this.onlineUsers.set(userId, { ...userData, socketId: socket.id });
    socket.join(userId);
    socket.emit("connected");
    this.emitOnlineUsers();
  }

  handleJoinChat(socket, { user, room } = {}, isDevelopment) {
    const roomId = room?._id;
    if (!roomId) return;

    socket.join(roomId);
    if (isDevelopment) {
      console.log(`${user?.name ?? "User"} Joined Room: ${roomId}`);
    }
  }

  handleTyping(socket, { room, user } = {}) {
    const roomId = room?._id;
    if (!roomId) return;

    socket.in(roomId).emit("typing", { room, user });
  }

  handleStopTyping(socket, { room, user } = {}) {
    const roomId = room?._id;
    if (!roomId) return;

    socket.in(roomId).emit("stop typing", { room, user });
  }

  handleNewMessage(socket, { newMessage } = {}, callback) {
    const chat = newMessage?.chat;
    const senderId = newMessage?.sender?._id;

    if (!chat?.users || !Array.isArray(chat.users)) {
      console.log("chat.users not defined");
      return;
    }

    chat.users.forEach((user) => {
      if (!user?._id || user._id == senderId) return;

      socket.in(user._id).emit("message received", { room: chat, newMessage });
      if (typeof callback === "function") {
        callback();
      }
    });
  }

  handleDisconnect(socket) {
    const removed = this.removeUserBySocketId(socket.id);
    if (removed) {
      this.emitOnlineUsers();
    }
  }
}

const socketManager = new SocketManager();
export default socketManager;
