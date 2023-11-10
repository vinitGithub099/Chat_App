import { createSlice } from "@reduxjs/toolkit";
import { connectChatSocket, receiveMessage } from "./SocketActions";

const initialState = {
  loading: false,
  chatSocket: null,
  typing: false,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* connectChatSocket */
    builder.addCase(connectChatSocket.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(connectChatSocket.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      chatSocket: payload.chatSocket,
    }));
    builder.addCase(connectChatSocket.fulfilled, (state) => ({
      ...state,
      loading: false,
    }));

    /* connectChatSocket */
    builder.addCase(receiveMessage.pending, (state) => ({
      ...state,
    }));
    builder.addCase(receiveMessage.fulfilled, (state) => ({
      ...state,
    }));
    builder.addCase(receiveMessage.fulfilled, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export default socketSlice.reducer;
