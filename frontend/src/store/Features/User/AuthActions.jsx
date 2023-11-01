import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../../api/authAPI";

export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  try {
    const res = await authAPI.loginUser(userData);
    return res;
  } catch (error) {
    throw new Error(error);
  }
});

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
