import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Card, CircularProgress, Grid, Typography, useTheme,
} from '@mui/material';

function Missions() {
  const theme = useTheme();

  // Mock mission data
  const missions = [
    {
      id: 1, name: 'Mission 1', route: '/missions/1', progress: 50,
    },
    {
      id: 2, name: 'Mission 2', route: '/missions/2', progress: 75,
    },
    {
      id: 3, name: 'Mission 3', route: '/missions/3', progress: 25,
    },
  ];

  return (
    <>
      <h3>username&apos;s missions</h3>
      <Box
        style={{
          borderRadius: 16,
          backgroundColor: theme.palette.background.card,
          boxShadow: theme.shadows.card,
        }}
        p={2}
      >
        <Grid container spacing={2}>
          {missions.map((mission) => (
            <Grid item xs={6} sm={4} md={3} key={mission.id}>
              <Link to={mission.route} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      padding: '10px',
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {mission.name}
                    </Typography>
                    <CircularProgress variant="determinate" value={mission.progress} />
                  </Box>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>

  );
}

export default Missions;
