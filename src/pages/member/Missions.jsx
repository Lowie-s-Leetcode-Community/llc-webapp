import React, { useState, useEffect } from 'react';
import {
  CircularProgress, Grid, Typography,
} from '@mui/material';
import axios from '../../config/axios.interceptor';
import CustomContainer from '../../components/CustomContainer';
import CustomGridItem from '../../components/CustomGridItem';

function Missions() {
  const username = localStorage.getItem('username');
  const serverUrl = process.env.REACT_APP_SERVER_API_URL;
  const userId = localStorage.getItem('userId');
  const MISSIONS_API = `${serverUrl}/api/users/${userId}/missions/all`;

  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get(MISSIONS_API);
        setMissions(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchMissions();
  }, []);

  return (
    <>
      <h3>
        {username}
        &apos;s missions
      </h3>
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
