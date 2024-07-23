import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  currentChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    insertChat: (state, { payload }) => {
      const newChat = payload;
      const existingChatIdx = state.chats.findIndex(
        (chat) => chat._id === newChat._id
      );

      if (existingChatIdx === -1) {
        state.chats.unshift(newChat); // Add new chat to the beginning of the array
      }
    },
    updateCurrentChat: (state, { payload }) => {
      state.currentChat = payload;
    },
    populateChats: (state, { payload }) => {
      state.chats = payload;
    },
    removeChat: (state, { payload }) => {
      state.chats =
        state.chats && state.chats.length
          ? state.chats.filter((chat) => chat._id !== payload)
          : [];
    },
    addChatMember: (state, { payload }) => {
      const { user, chatId } = payload;
      state.currentChat.users.push(user);
      let chatToModify = state.chats?.find((chat) => chat._id === chatId);
      chatToModify.users.push(user);
    },
    removeChatMember: (state, { payload }) => {
      const { userId, chatId } = payload;
      state.currentChat.users = state.currentChat.users.filter(
        (user) => user._id !== userId
      );
      let chatToModify = state.chats?.find((chat) => chat._id === chatId);
      chatToModify.users = chatToModify.users.filter(
        (user) => user._id !== userId
      );
    },
  },
});

export const {
  updateCurrentChat,
  removeChatMember,
  populateChats,
  addChatMember,
  removeChat,
  populateMessages,
  toggleActivity,
  insertChat,
} = chatSlice.actions;
export default chatSlice.reducer;
