import React, { useState, useEffect } from 'react';
import {
  CircularProgress, Grid, Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import useFetch from '../hooks/useFetch';
import CustomContainer from '../components/CustomContainer';
import CustomGridItem from '../components/CustomGridItem';

function Missions() {
  // Mock mission data
  const MISSIONS_API = 'http://localhost:3000/missions';
  // eslint-disable-next-line no-unused-vars
  // const { missions, isLoading, error } = useFetch(MISSIONS_API);
  const [missions, setMissions] = useState([]);

  // Mock mission data
  const mockMissions = [
    {
      id: 1,
      name: 'mission-progress-20',
      progress: 20,
      route: 'mission-progress-20',
    },
    {
      id: 2,
      name: 'mission-progress-60',
      progress: 60,
      route: 'mission-progress-60',
    },
    {
      id: 3,
      name: 'mission-progress-80',
      progress: 80,
      route: 'mission-progress-80',
    },
    {
      id: 4,
      name: 'mission-progress-10',
      progress: 10,
      route: 'mission-progress-10',
    },
    {
      id: 5,
      name: 'mission-progress-100',
      progress: 100,
      route: 'mission-progress-100',
    },
  ];

  useEffect(() => {
    setMissions(mockMissions.slice().sort((a, b) => a.progress <= b.progress));
  }, []);

  const theme = useTheme();
  return (
    <>
      <h3>
        <span style={{ color: theme.palette.primary.main }}>Username</span>'s missions
      </h3>

      <CustomContainer>
        <Grid container spacing={3}>
          {missions.map((mission) => (
            <CustomGridItem key={mission.id} id={mission.id} itemRoute={`/mission/${mission.route}`}>
              {mission.progress === 100 ? (
                // TODO content for progress 100
                <Typography variant="body1">Mission Completed!</Typography>
              ) : (
                // Regular content for other progress values
                <>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {mission.name}
                  </Typography>
                  <CircularProgress variant="determinate" value={mission.progress} />
                </>
              )}
            </CustomGridItem>
          ))}
        </Grid>
      </CustomContainer>
    </>

  );
}

export default Missions;
