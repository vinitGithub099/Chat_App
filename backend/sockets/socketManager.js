import { Server } from "socket.io";

class SocketManager {
  constructor() {
    this.io = null;
    // userId -> { user: object, sockets: Set<string> }
    this.onlineUsers = new Map();
  }

  init(httpServer, allowedOrigins, isDevelopment = false) {
    this.io = new Server(httpServer, {
      pingTimeout: 60000,
      cors: {
        origin: (origin, callback) => {
          // Non-browser requests (health checks, curl, mobile/server tools) have no origin
          if (!origin) return callback(null, true);
          const cleanOrigin = origin.replace(/\/+$/, "");
          if (!allowedOrigins.length || allowedOrigins.includes(cleanOrigin)) {
            return callback(null, true);
          }
          return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      },
    });

    this.io.on("connection", (socket) => {
      this.registerEvents(socket, isDevelopment);
    });

    return this.io;
  }

  getOnlineUsersList() {
    return Array.from(this.onlineUsers.values()).map((entry) => entry.user);
  }

  emitOnlineUsers() {
    if (!this.io) return;
    this.io.emit("online users", this.getOnlineUsersList());
  }

  removeSocket(socketId) {
    let statusChanged = false;

    for (const [userId, entry] of this.onlineUsers.entries()) {
      if (entry.sockets.has(socketId)) {
        entry.sockets.delete(socketId);
        if (entry.sockets.size === 0) {
          this.onlineUsers.delete(userId);
          statusChanged = true;
        }
      }
    }

    return statusChanged;
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
    const userId = userData?._id?.toString();
    if (!userId) return;

    const existing = this.onlineUsers.get(userId);
    if (existing) {
      existing.user = userData;
      existing.sockets.add(socket.id);
    } else {
      this.onlineUsers.set(userId, {
        user: userData,
        sockets: new Set([socket.id]),
      });
    }

    socket.join(userId);
    socket.emit("connected");
    this.emitOnlineUsers();
  }

  handleJoinChat(socket, { user, room } = {}, isDevelopment) {
    const roomId = room?._id?.toString();
    if (!roomId) return;

    socket.join(roomId);
    if (isDevelopment) {
      console.log(`${user?.name ?? "User"} Joined Room: ${roomId}`);
    }
  }

  handleTyping(socket, { room, user } = {}) {
    const roomId = room?._id?.toString();
    if (!roomId) return;

    socket.in(roomId).emit("typing", { room, user });
  }

  handleStopTyping(socket, { room, user } = {}) {
    const roomId = room?._id?.toString();
    if (!roomId) return;

    socket.in(roomId).emit("stop typing", { room, user });
  }

  handleNewMessage(socket, { newMessage } = {}, callback) {
    const chat = newMessage?.chat;
    const senderId = newMessage?.sender?._id?.toString();

    if (!chat?.users || !Array.isArray(chat.users)) {
      if (isDevelopment) console.log("chat.users not defined");
      return;
    }

    chat.users.forEach((user) => {
      const recipientId = user?._id?.toString();
      if (!recipientId || recipientId === senderId) return;

      socket
        .in(recipientId)
        .emit("message received", { room: chat, newMessage });
    });

    if (typeof callback === "function") {
      callback();
    }
  }

  handleDisconnect(socket) {
    const removed = this.removeSocket(socket.id);
    if (removed) {
      this.emitOnlineUsers();
    }
  }
}

const socketManager = new SocketManager();
export default socketManager;
