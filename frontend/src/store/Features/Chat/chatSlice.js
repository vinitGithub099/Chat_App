import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: {},
  currentChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    insertChat: (state, { payload }) => {
      state.chats[payload._id] = payload;
    },
    updateCurrentChat: (state, { payload }) => {
      state.currentChat = payload;
    },
    populateChats: (state, { payload }) => {
      state.chats = payload.reduce((acc, chat) => {
        acc[chat._id] = chat;
        return acc;
      }, {});
    },
    removeChat: (state, { payload }) => {
      delete state.chats[payload];
    },
    addChatMember: (state, { payload }) => {
      const { user, chatId } = payload;
      if (state.chats[chatId]) {
        state.chats[chatId].users.push(user);
        if (state.currentChat && state.currentChat._id === chatId) {
          state.currentChat.users.push(user);
        }
      }
    },
    removeChatMember: (state, { payload }) => {
      const { userId, chatId } = payload;
      if (state.chats[chatId]) {
        state.chats[chatId].users = state.chats[chatId].users.filter(user => user._id !== userId);
        if (state.currentChat && state.currentChat._id === chatId) {
          state.currentChat.users = state.currentChat.users.filter(user => user._id !== userId);
        }
      }
    },
  },
});

export const {
  updateCurrentChat,
  removeChatMember,
  populateChats,
  addChatMember,
  removeChat,
  insertChat,
} = chatSlice.actions;
export default chatSlice.reducer;
