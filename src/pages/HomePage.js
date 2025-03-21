import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/items/itemsSlice';
import ItemList from '../components/ItemList';

import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {status === 'loading' && <CircularProgress sx={{ mt: 3 }} />}
      {status === 'failed' && <Alert severity="error">{error}</Alert>}

      {status === 'succeeded' && <ItemList items={filteredItems} />}
    </Container>
  );
};

export default HomePage;