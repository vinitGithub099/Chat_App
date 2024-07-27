import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import localStorage from "redux-persist/es/storage";
import { apiSlice } from "./API/apiSlice";
import authReducer from "./Features/Auth/authSlice";
import chatReducer from "./Features/Chat/chatSlice";
import messageReducer from "./Features/Message/messageSlice";
import onlineUsersReducer from "./Features/OnlineUsers/onlineUsersSlice";
import searchReducer from "./Features/Search/searchSlice";
import uiReducer from "./Features/UI/uiSlice";

const authPersistConfig = {
  key: "auth",
  storage: localStorage,
  whitelist: ["user", "token", "isLoggedIn"],
  blacklist: ["loading", "tokenExpired"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  chat: chatReducer,
  ui: uiReducer,
  message: messageReducer,
  search: searchReducer,
  onlineUsers: onlineUsersReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        isSerializable: () => true,
      },
    }).concat(apiSlice.middleware),
});

export default store;
