import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/AuthSlice";
import profileReducer from "./Features/ProfileSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});
