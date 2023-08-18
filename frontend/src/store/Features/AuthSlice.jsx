/**
 * * important links
 * * https://ui.dev/react-router-protected-routes-authentication
 * * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  userName: null,
  token: null,
  authorized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload: { email, name, token } }) => ({
      ...state,
      email: email,
      userName: name,
      token: token,
    }),
    logout: (state) => ({
      ...state,
      email: null,
      userName: null,
      token: null,
    }),
    register: (state, { payload: { email, name, token } }) => ({
      ...state,
      email: email,
      userName: name,
      token: token,
    }),
    authorize: (state, { payload: { authorized } }) => ({
      ...state,
      authorized: authorized,
    }),
  },
});

export const { login, logout, register, authorize } = authSlice.actions;

export default authSlice.reducer;
