// searchSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { searchTabs } from "../../../constants/searchTabs";
import { fetchSearchResults } from "./searchActions";

// initialize search state of seach slice
const initSearchState = () =>
  Object.values(searchTabs).reduce((acc, curr) => ({ ...acc, [curr]: {} }), {});

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
