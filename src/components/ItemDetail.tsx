import React from 'react';
import { useParams, Link } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store'; // Update path as per your project structure

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const post = useSelector((state: RootState) =>
    state.items.items.find((item) => item.id === Number(id))
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
