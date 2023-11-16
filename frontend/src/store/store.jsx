import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./Features/Chat/ChatSlice";
import profileReducer from "./Features/ProfileSlice";
import socketReducer from "./Features/Socket/SocketSlice";
import authReducer from "./Features/User/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    chat: chatReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
