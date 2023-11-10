import { createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { ENDPOINT } from "../../../constants/constants";

export const connectChatSocket = createAsyncThunk(
  "socket/connectSocket",
  async (args, { getState }) => {
    const user = getState().auth.user;
    const socket = io(ENDPOINT);
    socket.emit("setup", user._id);
    socket.on("connected", () => {
      console.log("Socket connected from frontend with id: ", socket.id);
    });

    return { chatSocket: socket };
  }
);

export const receiveMessage = createAsyncThunk(
  "socket/receiveMessage",
  async (args, { getState }) => {
    const chatSocket = getState().socket.chatSocket;
    const currentChat = getState().chat.currentChat;
    let newMessage = null;
    await chatSocket.on("message received", (newMessageReceived) => {
      console.log(
        newMessageReceived.sender.name,
        " sent a message: ",
        newMessageReceived.content
      );
      if (
        !currentChat || // if chat is not selected or doesn't match current chat
        currentChat._id !== newMessageReceived.chat._id
      ) {
        //
      } else {
        console.log("inside receiver messages");
        newMessage = newMessageReceived;
      }
    });
    return { message: newMessage };
  }
);

export const sendMessage = createAsyncThunk(
  "socket/sendMessage",
  async (message, { getState }) => {
    const chatSocket = getState().socket.chatSocket;
    await chatSocket.emit("new message", message);
  }
);
