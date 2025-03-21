import { Grid } from '@mui/material';
import ItemCard from './ItemCard';
import { Item } from '../types/item'; // Adjust path if needed

type Props = {
  items: Item[];
};

const ItemList: React.FC<Props> = ({ items }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <ItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemList;