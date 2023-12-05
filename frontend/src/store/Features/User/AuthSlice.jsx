/**
 * * important links
 * * https://ui.dev/react-router-protected-routes-authentication
 * * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./AuthActions";

const initialState = {
  user: null,
  token: null,
  loading: {
    register: false,
    autoLogin: false,
    login: false,
  },
  tokenExpired: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => ({
      ...state,
      user: null,
      token: null,
    }),
    setTokenAction: (state, { payload }) => ({
      ...state,
      token: payload,
    }),
    setTokenExpiration: (state, { payload }) => ({
      ...state,
      tokenExpired: payload,
    }),
  },
  extraReducers: (builder) => {
    /* userLogin */
    builder.addCase(loginUser.pending, (state) => ({
      ...state,
      loading: { ...state.loading, login: true },
    }));
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      localStorage.setItem("access_token", payload.accessToken);
      return {
        ...state,
        user: payload.user,
        token: payload.accessToken,
        loading: { ...state.loading, login: false },
        tokenExpired: false,
      };
    });
    builder.addCase(loginUser.rejected, (state) => ({
      ...state,
      loading: { ...state.loading, login: false },
      tokenExpired: false,
    }));

    /* registerUser */
    builder.addCase(registerUser.pending, (state) => ({
      ...state,
      loading: { ...state.loading, register: true },
    }));
    builder.addCase(registerUser.fulfilled, (state) => ({
      ...state,
      loading: { ...state.loading, register: false },
      user: null,
      token: null,
    }));
    builder.addCase(registerUser.rejected, (state) => ({
      ...state,
      loading: { ...state.loading, register: false },
    }));
  },
});

export const { logout, setTokenAction, setTokenExpiration } = authSlice.actions;

export default authSlice.reducer;
