import { createAsyncThunk } from "@reduxjs/toolkit";
import { socketClient } from "../../../main";

export const connectToSocket = createAsyncThunk(
  "socket/connectToSocket",
  async (args, { getState }) => {
    const user = getState().auth.user;
    return await socketClient.connect(user);
  }
);

export const disconnectFromSocket = createAsyncThunk(
  "socket/disconnectFromSocket",
  async () => {
    return await socketClient.disconnect();
  }
);
