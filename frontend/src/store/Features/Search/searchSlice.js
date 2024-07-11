// searchSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { searchTabs } from "../../../constants/searchTabs";
import { initSearchState } from "../../../helpers/helpers";
import { fetchSearchResults } from "./searchActions";

const initialState = {
  activeTab: searchTabs.USERS,
  searchState: initSearchState(),
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.fulfilled, (state, { payload }) => {
        const { data } = payload;
        if (!state.searchState[state.activeTab]) {
          state.searchState[state.activeTab] = {};
        }
        state.searchState[state.activeTab].data = data;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        console.error("Fetch failed:", action.payload);
      });
  },
});

export const { updateActiveTab } = searchSlice.actions;

export default searchSlice.reducer;
