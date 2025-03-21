import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Item } from '../types/item';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = React.memo(({ item }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{item.title}</Typography>
      <Typography variant="body2">{item.body}</Typography>
    </CardContent>
    <CardActions>
      <Button component={Link} to={`/details/${item.id}`}>View Details</Button>
    </CardActions>
  </Card>
));

export default ItemCard;