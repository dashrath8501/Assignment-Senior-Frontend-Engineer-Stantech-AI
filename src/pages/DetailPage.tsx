import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';

type Post = {
  id: number;
  title: string;
  body: string;
};

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const post = useSelector((state: RootState) =>
    state.items.items.find((item: Post) => item.id === Number(id))
  );

  if (!post) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Post not found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body1">{post.body}</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            component={Link}
            to="/"
          >
            Back to List
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DetailPage;