import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Typography, Box,
} from '@mui/material';

function Welcome() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Welcome to
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', fontWeight: '500', marginBottom: '5%' }}>
        Lowie&apos;s LeetCode Community!
      </Typography>
      <Button variant="contained" size="large" onClick={handleLoginClick}>
        Log in
      </Button>
    </Box>

  );
}

export default Welcome;
