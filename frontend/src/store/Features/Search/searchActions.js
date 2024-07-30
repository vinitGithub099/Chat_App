// fetchSearchResults.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchTabs } from "../../../constants/searchTabs";
import { apiSlice } from "../../API/apiSlice";

const filterExistingData = (activeTab, existingData, query) => {
  switch (activeTab) {
    case searchTabs.USERS:
      return existingData.filter(
        (item) =>
          item.name?.toLowerCase().includes(query) ||
          item.email?.toLowerCase().includes(query)
      );
    case searchTabs.CHATS:
      // Replace with the actual filtering logic for chats
      return existingData.filter((item) =>
        item.chatName?.toLowerCase().includes(query)
      );
    // Extend for more tabs
    default:
      return existingData;
  }
};

const fetchFromAPI = async (activeTab, query, dispatch) => {
  switch (activeTab) {
    case searchTabs.USERS:
      return await dispatch(
        apiSlice.endpoints.fetchUsers.initiate(query)
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
        search: { activeTab },
        chat,
      } = getState();
      let existingData = [];

      if (activeTab === searchTabs.CHATS) {
        existingData = chat.chats; // Access local chats data
      } else {
        const {
          search: { searchState },
        } = getState();
        existingData = searchState[activeTab]?.data;
      }

      if (existingData) {
        const filteredData = filterExistingData(activeTab, existingData, query);
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
