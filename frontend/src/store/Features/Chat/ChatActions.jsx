import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatAPI } from "../../../api/chatAPI";
import { messageAPI } from "../../../api/messageAPI";
import { handelTokenExpiration } from "../../../utils/Utils";

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (args, { dispatch }) => {
    try {
      const res = await chatAPI.fetchChats();
      return res;
    } catch (error) {
      handelTokenExpiration(error.getResObj(), dispatch);
      throw error;
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
      throw error;
    }
  }
);
