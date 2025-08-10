import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urls: [],
  
  loading: false,
  error: false
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    // Replace the entire array (used for fetching)
    setUrls: (state, action) => {
      state.urls = Array.isArray(action.payload) ? action.payload : [];
    },
    // Add a single URL object
    addUrl: (state, action) => {
      state.urls.push(action.payload);
    },
    // Remove a single URL by _id or shortCode
    deleteUrl: (state, action) => {
      state.urls = state.urls.filter(
        url => url._id !== action.payload && url.shortCode !== action.payload
      );
    },
    
  }
});

export const { setUrls, addUrl, deleteUrl } = urlSlice.actions;
export default urlSlice.reducer;
