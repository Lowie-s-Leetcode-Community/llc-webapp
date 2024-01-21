import React, { useState, useEffect } from 'react';
import {
  Grid, Box, useTheme,
} from '@mui/material';
import axios from 'axios';
// import useFetch from '../hooks/useFetch';
import CustomList from '../../components/CustomList';
import { CustomCard } from '../../components/CustomCard';

function Dashboard() {
  const username = localStorage.getItem('username');
  const theme = useTheme();
  return (
    <>
      <h3>
        <span style={{ color: theme.palette.primary.main }}>
          {username}
        </span>
        &apos;s dashboard
      </h3>
      <StatsBoard />
      <Leaderboard />
    </>
  );
}

function StatsBoard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <CustomCard type="gold"><h4>Recent Awards</h4></CustomCard>
      </Grid>
      <Grid item xs={12} sm={3} md={1}>
        <CustomCard type="normal"><h4>Aced</h4></CustomCard>
      </Grid>
      <Grid item xs={12} sm={3} md={1}>
        <CustomCard type="normal"><h4>Rank</h4></CustomCard>
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <CustomCard type="normal">
          <h4>Favourite Missions</h4>
        </CustomCard>
      </Grid>
      <Grid item xs={12} sm={12} md={2}>
        <CustomCard type="normal"><h4>Solved</h4></CustomCard>
      </Grid>
    </Grid>
  );
}

function Leaderboard() {
  const leaderboardUrl = 'http://localhost:3000/api/leaderboard';

  const [leaderboardData, setLeaderboardData] = useState([]);
  useEffect(() => {
    axios.get(leaderboardUrl)
      .then((response) => setLeaderboardData(response.data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <>
      {!leaderboardData && (
        // TODO: Add loading animation
        <Box>Loading...</Box>
      )}
      {leaderboardData && (
        <CustomList data={leaderboardData} title="Leaderboard" totalTitle="Total users" primaryData="username" secondaryData="scoreEarned" secondaryTitle="Score" />
      )}
    </>
  );
}

export default Dashboard;
