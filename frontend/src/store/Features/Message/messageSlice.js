import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    populateMessages: (state, { payload }) => {
      state.messages = payload;
    },
    appendMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});

export const { populateMessages, appendMessage } = messageSlice.actions;
export default messageSlice.reducer;
