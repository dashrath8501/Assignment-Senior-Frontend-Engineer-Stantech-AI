// src/pages/HomePage.tsx
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchItems } from '../features/items/itemsSlice';
import ItemList from '../components/ItemList';

import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Pagination,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

const POSTS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.items);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>('title-asc');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    setSortOrder(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOrder) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'id-asc':
        return a.id - b.id;
      case 'id-desc':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedItems.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Posts List
      </Typography>

      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          value={sortOrder}
          onChange={handleSortChange}
          label="Sort By"
        >
          <MenuItem value="title-asc">Title (A-Z)</MenuItem>
          <MenuItem value="title-desc">Title (Z-A)</MenuItem>
          <MenuItem value="id-asc">ID (Ascending)</MenuItem>
          <MenuItem value="id-desc">ID (Descending)</MenuItem>
        </Select>
      </FormControl>

      {status === 'loading' && <CircularProgress sx={{ mt: 3 }} />}
      {status === 'failed' && <Alert severity="error">{error}</Alert>}
      {status === 'succeeded' && (
        <>
          <ItemList items={paginatedItems} />
          {totalPages > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;