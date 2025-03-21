import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router';

const ItemCard = ({ item }) => {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.body.slice(0, 100)}...
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 'auto' }}>
        <Button
          size="small"
          component={Link}
          to={`/post/${item.id}`}
          variant="contained"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;