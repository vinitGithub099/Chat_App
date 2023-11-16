import { createSlice } from "@reduxjs/toolkit";
import { connectToSocket, disconnectFromSocket } from "./SocketActions";

const initialState = {
  connectionStatus: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectToSocket.pending, (state) => {
      state.connectionStatus = "connecting";
    });
    builder.addCase(connectToSocket.fulfilled, (state) => {
      state.connectionStatus = "connected";
    });
    builder.addCase(connectToSocket.rejected, (state) => {
      state.connectionStatus = "connection failed";
    });
    builder.addCase(disconnectFromSocket.pending, (state) => {
      state.connectionStatus = "disconnecting";
    });
    builder.addCase(disconnectFromSocket.fulfilled, (state) => {
      state.connectionStatus = "disconnected";
    });
    builder.addCase(disconnectFromSocket.rejected, (state) => {
      state.connectionStatus = "disconnection failed";
    });
  },
});

export default socketSlice.reducer;
