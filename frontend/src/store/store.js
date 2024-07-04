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
import authReducer from "./Features/Auth/AuthSlice";
import chatReducer from "./Features/Chat/ChatSlice";
import messageReducer from "./Features/Message/MessageSlice";
import uiReducer from "./Features/UI/UISlice";

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
