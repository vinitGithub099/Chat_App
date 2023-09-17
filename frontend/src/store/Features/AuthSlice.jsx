/**
 * * important links
 * * https://ui.dev/react-router-protected-routes-authentication
 * * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./AuthActions";

const initialState = {
  loading: false,
  error: null,
  email: null,
  name: null,
  token: null,
  authorized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => ({
      ...state,
      email: null,
      name: null,
      token: null,
    }),
    authorize: (state, { payload: { authorized } }) => ({
      ...state,
      authorized: authorized,
    }),
  },
  extraReducers: (builder) => {
    /* userLogin */
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.name = payload.name;
      state.email = payload.email;
      state.token = payload.token;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.name = null;
      state.email = null;
      state.token = null;
    });

    /* registerUser */
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { login, logout, register, authorize } = authSlice.actions;

export default authSlice.reducer;
