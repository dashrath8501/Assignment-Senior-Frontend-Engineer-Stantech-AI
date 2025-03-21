import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Item, ItemsState } from '../../types/item';

const initialState: ItemsState = {
  items: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalPages: 1,
  sortBy: 'title',
  sortOrder: 'asc',
};

export const fetchItems = createAsyncThunk<Item[]>('items/fetchItems', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortOptions: (state, action: PayloadAction<{ sortBy: 'title' | 'id'; sortOrder: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setCurrentPage, setSortOptions } = itemsSlice.actions;
export default itemsSlice.reducer;