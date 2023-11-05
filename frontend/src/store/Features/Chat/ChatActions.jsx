import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatAPI } from "../../../api/chatAPI";
import { messageAPI } from "../../../api/messageAPI";

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
  async (id) => {
    try {
      const res = await messageAPI.fetchChatMessages(id);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
);
