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
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem("access_token", null);
      return {
        ...state,
        user: null,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    /* userLogin */
    builder.addCase(loginUser.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      localStorage.setItem("access_token", payload.accessToken);
      return {
        ...state,
        user: payload.user,
        token: payload.accessToken,
        loading: false,
        error: null,
      };
    });
    builder.addCase(loginUser.rejected, (state) => ({
      ...state,
      loading: false,
      // error: payload.res,
    }));

    /* registerUser */
    builder.addCase(registerUser.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(registerUser.fulfilled, (state) => ({
      ...state,
      loading: false,
      user: null,
      token: null,
      // error: payload.res,
    }));
    builder.addCase(registerUser.rejected, (state) => ({
      ...state,
      loading: false,
      // error: payload.res,
    }));
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
