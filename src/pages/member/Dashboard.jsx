import React, { useState, useEffect } from 'react';
import {
  Grid,
} from '@mui/material';
// import useFetch from '../hooks/useFetch';
import CustomList from '../../components/CustomList';
import { CustomCard } from '../../components/CustomCard';

function Dashboard() {
  return (
    <>
      <h3>username&apos;s dashboard</h3>
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
  // Mock data for leaderboard

  const leaderboardUrl = 'http://localhost:3000/leaderboard';
  // const { leaderboardData, isLoading, error } = useFetch(leaderboardUrl);
  const [leaderboardData, setLeaderboarData] = useState([]);
  useEffect(() => {
    fetch(leaderboardUrl)
      .then((response) => response.json())
      .then((data) => setLeaderboarData(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <>
      {/* {isLoading && <div>Loading....</div>}
      {error && <div>{error}</div>} */}

      {leaderboardData && (
        <CustomList data={leaderboardData} title="Leaderboard" totalTitle="Total users" primaryData="username" secondaryData="aced" secondaryTitle="Aced" />
      )}
    </>
  );
}

export default Dashboard;
