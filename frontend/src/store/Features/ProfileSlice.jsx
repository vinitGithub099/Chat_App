/**
 * * important links
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: {
    name: "Vinit",
    email: "vinitKumbhare@gmail.com",
    bio: "Hello World!",
    phone: "9975052986",
    password: "L@34!asdnk",
  },
};

export const profileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfile: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
