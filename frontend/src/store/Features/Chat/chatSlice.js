/**
 * * important links
 * * https://ui.dev/react-router-protected-routes-authentication
 * * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openActivity: true,
  chats: [],
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
    populateChats: (state, { payload }) => {
      state.chats = payload;
    },
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
  },
});

export const {
  setCurrentChat,
  removeChatMember,
  populateChats,
  addChatMember,
  removeChat,
  populateMessages,
  toggleActivity,
  setActivity,
} = chatSlice.actions;
export default chatSlice.reducer;
