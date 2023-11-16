import { createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { chatAPI } from "../../../api/chatAPI";
import { messageAPI } from "../../../api/messageAPI";
import { ENDPOINT } from "../../../constants/constants";
import { socketClient } from "../../../main";

export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  try {
    const res = await chatAPI.fetchChats();
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
    const eventHandler = (
      { room: room, newMessage: newMessageReceived },
      resolve,
      reject
    ) => {
      const currentChat = getState().chat.currentChat;

      if (!room || !newMessageReceived) reject("Data not received");

      if (!currentChat || currentChat._id != room._id) {
        resolve({ notification: newMessageReceived });
      } else {
        resolve({ newMessage: newMessageReceived });
      }
    };

    try {
      // const res = await socketClient.on("message received", eventHandler);
      return await socketClient.on("message received", eventHandler);
      // if (res?.newMessage) {
      //   return res;
      // } else {
      //   console.log(res);
      // }
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  "chat/sendChatMessage",
  async ({ newMessage }) => {
    try {
      await socketClient.emit("new message", { newMessage });
      return { newMessage: newMessage };
    } catch (error) {
      console.log(error);
    }
  }
);

export const joinChat = createAsyncThunk(
  "chat/joinChat",
  async (args, { getState }) => {
    const currentChat = getState().chat.currentChat;
    const user = getState().auth.user;
    return await socketClient.emit("join chat", {
      user: user,
      room: currentChat,
    });
  }
);
