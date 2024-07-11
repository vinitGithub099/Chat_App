// fetchSearchResults.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchTabs } from "../../../constants/searchTabs";
import { apiSlice } from "../../API/apiSlice";

const filterExistingData = (existingData, query) => {
  return existingData.filter(
    (item) =>
      item.name?.toLowerCase().includes(query.toLowerCase()) ||
      item.email?.toLowerCase().includes(query.toLowerCase())
  );
};

const fetchFromAPI = async (activeTab, query, dispatch) => {
  switch (activeTab) {
    case searchTabs.USERS:
      return await dispatch(
        apiSlice.endpoints.searchUser.initiate(query)
      ).unwrap();
    case searchTabs.CHATS:
      // Replace with the actual API call for chats
      return [];
    // Extend for more tabs
    default:
      return [];
  }
};

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ query }, { getState, dispatch, rejectWithValue }) => {
    try {
      const {
        search: { activeTab, searchState },
      } = getState();
      const existingData = searchState[activeTab]?.data;

      if (existingData) {
        const filteredData = filterExistingData(existingData, query);
        if (filteredData.length) {
          return { data: filteredData };
        }
      }

      const response = await fetchFromAPI(activeTab, query, dispatch);
      return { data: response };
    } catch (error) {
      console.error("Error fetching search results:", error);
      return rejectWithValue(error.message || "Failed to fetch search results");
    }
  }
);
