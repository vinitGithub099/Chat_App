import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./Features/Chat/ChatSlice";
import profileReducer from "./Features/ProfileSlice";
import authReducer from "./Features/User/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
