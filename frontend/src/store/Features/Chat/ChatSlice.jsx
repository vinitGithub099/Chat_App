/**
 * * important links
 * * https://ui.dev/react-router-protected-routes-authentication
 * * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

import { createSlice } from "@reduxjs/toolkit";
import { fetchChatMessages, fetchChats } from "./ChatActions";

const initialState = {
  chats: null,
  messages: null,
  loading: {
    chats: false,
    messages: false,
  },
  error: false,
  currentChat: null,
  chatSocket: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, { payload }) => ({
      ...state,
      currentChat: payload,
    }),
    setMessages: (state, { payload }) => ({
      ...state,
      messages: [...state.messages, payload],
    }),
    connectChatSocket: (state, { payload }) => ({
      ...state,
      chatSocket: payload,
    }),
  },
  extraReducers: (builder) => {
    /* fetchChats */
    builder.addCase(fetchChats.pending, (state) => ({
      ...state,
      loading: { chats: true, messages: false },
    }));
    builder.addCase(fetchChats.fulfilled, (state, { payload }) => ({
      ...state,
      loading: { chats: false, messages: false },
      chats: payload,
    }));
    builder.addCase(fetchChats.rejected, (state) => ({
      ...state,
      loading: { chats: false, messages: false },
      chats: null,
    }));

    /* fetchChatMessages */
    builder.addCase(fetchChatMessages.pending, (state) => ({
      ...state,
      loading: { chats: false, messages: true },
    }));
    builder.addCase(fetchChatMessages.fulfilled, (state, { payload }) => ({
      ...state,
      loading: { chats: false, messages: true },
      messages: payload,
    }));
    builder.addCase(fetchChatMessages.rejected, (state) => ({
      ...state,
      loading: { chats: false, messages: true },
      messages: null,
    }));
  },
});

export const { setCurrentChat, connectChatSocket, setMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
