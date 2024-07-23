import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "../../../constants/sideMenu";

const initialState = {
  contentLabel: MENU_ITEMS.CHATS.label,
  activityLabel: null,
  isSidebarOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state, { payload }) => {
      state.isSidebarOpen = payload ? payload : !state.isSidebarOpen;
    },
    setContentLabel: (state, { payload }) => {
      state.contentLabel = payload;
      state.activityLabel = state.activityLabel ?? null;
    },
    setActitvityLabel: (state, { payload }) => {
      state.activityLabel = payload;
    },
  },
});

export const { toggleSidebar, setContentLabel, setActitvityLabel } =
  uiSlice.actions;
export default uiSlice.reducer;
