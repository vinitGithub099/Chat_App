/**
 * * important links
 * * https://ui.dev/react-router-protected-routes-authentication
 * * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChatMessages,
  fetchChats,
  joinChat,
  receiveMessage,
  sendChatMessage,
} from "./ChatActions";

const initialState = {
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
    setCurrentChat: (state, { payload }) => ({
      ...state,
      currentChat: payload,
    }),
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
      ...state,
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
      const newMessage =
        !state.messages ||
        (state.messages.length &&
          state.messages[state.messages.length - 1]._id !==
            payload?.newMessage?._id)
          ? payload?.newMessage
          : null;
      return {
        ...state,
        messages: newMessage
          ? state.messages.concat(newMessage)
          : state.messages,
      };
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

    /* receiveMessage */
    builder.addCase(receiveMessage.pending, (state) => ({
      ...state,
    }));
    builder.addCase(receiveMessage.fulfilled, (state, { payload }) => {
      const newMessage =
        !state.messages ||
        (state.messages.length &&
          state.messages[state.messages.length - 1]._id !==
            payload?.newMessage?._id)
          ? payload?.newMessage
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

export const {
  setCurrentChat,
  removeChatMember,
  populateChat,
  addChatMember,
  removeChat,
  populateMessages,
} = chatSlice.actions;
export default chatSlice.reducer;
