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
import chatReducer from "./Features/Chat/ChatSlice";
import profileReducer from "./Features/ProfileSlice";
import authReducer from "./Features/User/AuthSlice";

const authPersistConfig = {
  key: "auth",
  storage: localStorage,
  whitelist: ["user", "token"],
  blacklist: ["loading", "tokenExpired"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  profile: profileReducer,
  chat: chatReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        isSerializable: () => true,
      },
    }),
});

export default store;
