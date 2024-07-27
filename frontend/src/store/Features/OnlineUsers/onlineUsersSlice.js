import { createSlice } from '@reduxjs/toolkit';

const onlineUsersSlice = createSlice({
  name: 'onlineUsers',
  initialState: {},
  reducers: {
    setOnlineUsers: (state, {payload}) => {
      return payload.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
    },
  },
});

export const {  setOnlineUsers } = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
