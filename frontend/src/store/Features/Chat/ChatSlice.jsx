/**
 * * important links
 * * https://ui.dev/react-router-protected-routes-authentication
 * * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

import { createSlice } from "@reduxjs/toolkit";
import { fetchChatMessages, fetchChats } from "./ChatActions";

const initialState = {
  openActivity: true,
  chats: [],
  messages: [],
  loading: {
    chats: false,
    messages: false,
  },
  error: false,
  currentChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleActivity: (state) => ({
      ...state,
      openActivity: !state.openActivity,
    }),
    setActivity: (state, { payload }) => ({
      ...state,
      openActivity: payload,
    }),
    setCurrentChat: (state, { payload }) => {
      state.currentChat = payload;
    },
    populateChat: (state, { payload }) => ({
      ...state,
      chats: state.chats.find((chat) => chat._id === payload._id)
        ? state.chats
        : [payload].concat(state.chats),
    }),
    removeChat: (state, { payload }) => ({
      ...state,
      chats:
        state.chats && state.chats.length
          ? state.chats.filter((chat) => chat._id !== payload._id)
          : [],
    }),
    addChatMember: (state, { payload }) => ({
      ...state.currentChat.users.push(),
      currentChat: {
        ...state.currentChat,
        users: payload ? payload : state.currentChat?.users,
      },
    }),
    removeChatMember: (state, { payload }) => ({
      ...state,
      currentChat: {
        ...state.currentChat,
        users: state.currentChat?.users.filter((user) => user._id !== payload),
      },
    }),
    populateMessages: (state, { payload }) => {
      state.messages.push(payload);
    },
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
      loading: { chats: false, messages: false },
      messages: payload,
    }));
    builder.addCase(fetchChatMessages.rejected, (state) => ({
      ...state,
      loading: { chats: false, messages: false },
      messages: null,
    }));
  },
});

export const {
  setCurrentChat,
  removeChatMember,
  populateChat,
  addChatMember,
  removeChat,
  populateMessages,
  toggleActivity,
  setActivity,
} = chatSlice.actions;
export default chatSlice.reducer;
