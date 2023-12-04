import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../../api/authAPI";
import { handelTokenExpiration } from "../../Utils/ActionUtils";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { dispatch }) => {
    try {
      const res = await authAPI.loginUser(userData);
      return res;
    } catch (error) {
      handelTokenExpiration(error, dispatch);
      throw new Error(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    try {
      const res = await authAPI.registerUser(userData);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const autoLogin = createAsyncThunk(
  "auth/autLogin",
  async (args, { dispatch }) => {
    try {
      const res = await authAPI.autoLogin();
      console.log(res);
      return res;
    } catch (error) {
      handelTokenExpiration(error, dispatch);
      throw new Error(error);
    }
  }
);
