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
} from '@mui/material';

const POSTS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.items);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + POSTS_PER_PAGE);

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