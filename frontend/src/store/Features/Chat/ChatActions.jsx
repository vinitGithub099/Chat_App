import { createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { chatAPI } from "../../../api/chatAPI";
import { messageAPI } from "../../../api/messageAPI";
import { ENDPOINT } from "../../../constants/constants";

export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  try {
    const res = await chatAPI.fetchChats();
    console.log(res);
    return res;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async (chatId, { getState }) => {
    const currentChat = getState().chat.currentChat;
    try {
      const res = await messageAPI.fetchChatMessages(currentChat._id);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const connectChatSocket = createAsyncThunk(
  "chat/connectSocket",
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
  "chat/receiveMessage",
  async (args, { getState }) => {
    const chatSocket = getState().chat.chatSocket;
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

export const sendChatMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { getState }) => {
    const chatSocket = getState().chat.chatSocket;
    await chatSocket.emit("new message", message);
    return { newMessage: message };
  }
);

export const joinChat = createAsyncThunk(
  "chat/joinChat",
  async (args, { getState }) => {
    const chatSocket = getState().chat.chatSocket;
    const currentChat = getState().chat.currentChat;

    await chatSocket.emit("join chat", currentChat._id);
  }
);
