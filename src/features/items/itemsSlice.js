import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk('items/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await response.json();
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;