import React, { useState, useEffect } from 'react';
import {
  CircularProgress, Grid, Typography,
} from '@mui/material';
// import useFetch from '../hooks/useFetch';
import CustomContainer from '../components/CustomContainer';
import CustomGridItem from '../components/CustomGridItem';

function Missions() {
  // Mock mission data
  const MISSIONS_API = 'http://localhost:3000/missions';
  // eslint-disable-next-line no-unused-vars
  // const { missions, isLoading, error } = useFetch(MISSIONS_API);
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetch(MISSIONS_API)
      .then((response) => response.json())
      .then((data) => setMissions(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <>
      <h3>username&apos;s missions</h3>
      <CustomContainer>
        <Grid container spacing={3}>
          {missions.map((mission) => (
            <CustomGridItem key={mission.id} id={mission.id} itemRoute={mission.route}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {mission.name}
              </Typography>
              <CircularProgress variant="determinate" value={mission.progress} />
            </CustomGridItem>
          ))}
        </Grid>
      </CustomContainer>
    </>

  );
}

export default Missions;
