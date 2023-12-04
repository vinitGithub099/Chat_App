import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatAPI } from "../../../api/chatAPI";
import { messageAPI } from "../../../api/messageAPI";
import { socketClient } from "../../../main";
import { handelTokenExpiration } from "../../Utils/ActionUtils";

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (args, { dispatch }) => {
    try {
      const res = await chatAPI.fetchChats();
      return res;
    } catch (error) {
      handelTokenExpiration(error, dispatch);
      throw new Error(error);
    }
  }
);

export const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async (chatId, { getState, dispatch }) => {
    const currentChat = getState().chat.currentChat;
    try {
      const res = await messageAPI.fetchChatMessages(currentChat._id);
      return res;
    } catch (error) {
      handelTokenExpiration(error, dispatch);
      throw new Error(error);
    }
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
      return await socketClient.on("message received", eventHandler);
    } catch (error) {
      throw new Error(error);
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
