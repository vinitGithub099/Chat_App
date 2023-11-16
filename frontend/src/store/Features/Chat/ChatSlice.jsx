/**
 * * important links
 * * https://ui.dev/react-router-protected-routes-authentication
 * * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

import { createSlice } from "@reduxjs/toolkit";
import {
  connectChatSocket,
  fetchChatMessages,
  fetchChats,
  joinChat,
  receiveMessage,
  sendChatMessage,
} from "./ChatActions";

const initialState = {
  chats: null,
  messages: [],
  loading: {
    chats: false,
    messages: false,
  },
  error: false,
  currentChat: null,
  typing: false,
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
      messages: state.messages.concat(payload.message),
    }),
    removeChatMember: (state, { payload }) => ({
      ...state,
      currentChat: {
        ...state.currentChat,
        users: state.users.filer((user) => user._id !== payload),
      },
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

    /* connectChatSocket */
    builder.addCase(connectChatSocket.pending, (state) => ({
      ...state,
    }));
    builder.addCase(connectChatSocket.fulfilled, (state, { payload }) => ({
      ...state,
      chatSocket: payload.chatSocket,
    }));
    builder.addCase(connectChatSocket.rejected, (state) => ({
      ...state,
    }));

    /* receiveMessage */
    builder.addCase(receiveMessage.pending, (state) => ({
      ...state,
    }));
    builder.addCase(receiveMessage.fulfilled, (state, { payload }) => {
      const newMessage =
        !state.messages ||
        (state.messages.length &&
          state.messages[state.messages.length - 1]._id !==
            payload.newMessage?._id)
          ? payload.newMessage
          : null;
      return {
        ...state,
        messages: newMessage
          ? state.messages.concat(newMessage)
          : state.messages,
      };
    });
    builder.addCase(receiveMessage.rejected, (state) => ({
      ...state,
    }));

    /* sendChatMessage */
    builder.addCase(sendChatMessage.pending, (state) => ({
      ...state,
    }));
    builder.addCase(sendChatMessage.fulfilled, (state, { payload }) => ({
      ...state,
      messages: state.messages.concat(payload.newMessage),
    }));
    builder.addCase(sendChatMessage.rejected, (state) => ({
      ...state,
    }));

    /* sendChatMessage */
    builder.addCase(joinChat.pending, (state) => ({
      ...state,
    }));
    builder.addCase(joinChat.fulfilled, (state) => ({
      ...state,
    }));
    builder.addCase(joinChat.rejected, (state) => ({
      ...state,
    }));
  },
});

export const { setCurrentChat, setMessages, removeChatMember } =
  chatSlice.actions;
export default chatSlice.reducer;
