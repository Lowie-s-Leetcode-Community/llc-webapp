import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';

function NotFound() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Link to="/">
        <Button variant="contained" color="primary">
          Go to Home
        </Button>
      </Link>
    </Container>
  );
}

export default NotFound;
