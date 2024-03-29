import React, { useState, useEffect } from 'react';
import {
  Grid, Box, Typography,
  LinearProgress, Chip,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DoneIcon from '@mui/icons-material/Done';
import GradeIcon from '@mui/icons-material/Grade';
import axios from '../../config/axios.interceptor';
import CustomList from '../../components/CustomList';
import { CustomCard } from '../../components/CustomCard';
import Spinner from '../../components/Spinner';
import PageTitle from '../../components/PageTitle';
// import CustomOrderedList from "../../components/CustomOrderedList";

function Dashboard() {
  const serverUrl = process.env.REACT_APP_SERVER_API_URL;
  const userId = localStorage.getItem('userId');
  const DASHBOARD_API = `${serverUrl}/api/users/${userId}/dashboard`;
  const DAILY_CHALLENGE_API = `${serverUrl}/api/problems/daily`;
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userStats, setUserStats] = useState({
    rank: 0,
    score: 0,
    solved: 0,
    aced: 0,
    topMissions: [],
  });
  const [dailyChallenge, setDailyChallenge] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardResponse = await axios.get(DASHBOARD_API);
        setLeaderboardData(dashboardResponse.data.leaderboard);
        setUserStats({
          rank: dashboardResponse.data.rank,
          score: dashboardResponse.data.score,
          solved: dashboardResponse.data.solved,
          aced: dashboardResponse.data.aced,
          topMissions: dashboardResponse.data.topMissions,
        });

        const dailyChallengeResponse = await axios.get(DAILY_CHALLENGE_API);
        setDailyChallenge(dailyChallengeResponse.data);
        setIsLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageTitle title="dashboard" includeUsername />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <StatsBoard
            stats={userStats}
            dailyChallenge={dailyChallenge}
            totalMembers={leaderboardData.length}
          />
          <Leaderboard leaderboardData={leaderboardData} />
        </>
      )}
    </>
  );
}

function StatsBoard({ stats, dailyChallenge, totalMembers }) {
  return (
    <Grid container spacing={2} marginBottom="2%">
      <Grid item xs={12} sm={6} md={4}>
        <Link
          to={`https://leetcode.com/problems/${dailyChallenge.titleSlug}`}
          target="_blank"
          style={{ textDecoration: 'none', height: 0, width: 0 }}
        >
          <CustomCard
            type="gold"
            sx={{
              height: '100%',
              padding: '5% 10%',
              '&:hover': {
                filter: 'brightness(1.1)',
                cursor: 'pointer',
              },
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Daily Challenge</Typography>
            <Typography variant="p" sx={{ marginBottom: '1rem', fontWeight: '600', fontSize: '1.5rem' }}>
              {dailyChallenge.id}
              {'. '}
              {dailyChallenge.title}
            </Typography>
            <Typography variant="p" sx={{ marginBottom: '0.5rem' }}>
              Difficulty:
              {' '}
              <Typography variant="p" sx={{ }}>{dailyChallenge.difficulty}</Typography>

            </Typography>
            <Typography variant="p" sx={{ marginBottom: '1.5rem', fontStyle: 'italic' }}>
              {dailyChallenge.numberOfMembersSolved}
              /
              {totalMembers}
              {' '}
              members completed
            </Typography>
            {dailyChallenge.topics && dailyChallenge.topics.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {dailyChallenge.topics.slice(0, 4).map((topic) => (
                <Chip key={topic.id} color="secondary" label={topic.topicName} sx={{ marginRight: '0.5rem', marginBottom: '0.5rem' }} />
              ))}
              {dailyChallenge.topics.length > 4 && (
              <Chip color="secondary" label={`+(${dailyChallenge.topics.length - 4})`} sx={{ marginRight: '0.5rem', marginBottom: '0.5rem' }} />
              )}
            </Box>
            )}
          </CustomCard>
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={5}>
        <Link
          to="/missions"
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <CustomCard
            type="normal"
            sx={{
              height: '100%',
              padding: '5% 10%',
              '&:hover': {
                filter: 'brightness(0.95)',
                cursor: 'pointer',
              },
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '2rem' }}>Mission Progress</Typography>
            {stats.topMissions.length === 0 ? (
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                marginBottom="0.5rem"
                width="100%"
                sx={{ fontStyle: 'italic', color: 'gray' }}
              >
                <Typography variant="body1">
                  Looks like you haven&apos;t made any progress on missions yet.
                  Time to embark on an adventure and start conquering missions! 🚀
                </Typography>
              </Box>
            ) : (
              stats.topMissions.map((mission) => (
                <Box
                  key={mission.id}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom="0.5rem"
                  width="100%"
                >
                  <Box sx={{ flex: 1, textAlign: 'left' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        display: 'inline-block',
                      }}
                    >
                      {mission.name}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 2 }}>
                    <LinearProgress variant="determinate" color="secondary" value={mission.progress} sx={{ height: 12, borderRadius: 5 }} />
                  </Box>
                </Box>
              ))
            )}
          </CustomCard>
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Grid container rowSpacing={2} columnSpacing={2} sx={{ height: '105%' }}>
          <Grid item xs={12} sm={6}>
            <CustomCard
              type="normal"
              sx={{
                height: '100%',
                '&:hover': {
                  filter: 'brightness(0.95)',
                },
              }}
            >
              <GradeIcon fontSize="large" color="secondary" />
              <Typography variant="h6">Score</Typography>
              <Typography variant="p" sx={{ fontSize: '1.5rem' }}>{stats.score}</Typography>
            </CustomCard>
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomCard
              type="normal"
              sx={{
                height: '100%',
                '&:hover': {
                  filter: 'brightness(0.95)',
                },
              }}
            >
              <MilitaryTechIcon fontSize="large" color="secondary" />
              <Typography variant="h6">Rank</Typography>
              <Typography variant="p" sx={{ fontSize: '1.5rem' }}>{stats.rank}</Typography>
            </CustomCard>
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomCard
              type="normal"
              sx={{
                height: '100%',
                '&:hover': {
                  filter: 'brightness(0.95)',
                },
              }}
            >
              <EmojiEventsIcon fontSize="large" color="secondary" />
              <Typography variant="h6">Aced</Typography>
              <Typography variant="p" sx={{ fontSize: '1.5rem' }}>{stats.aced}</Typography>
            </CustomCard>
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomCard
              type="normal"
              sx={{
                height: '100%',
                '&:hover': {
                  filter: 'brightness(0.95)',
                },
              }}
            >
              <DoneIcon fontSize="large" color="secondary" />
              <Typography variant="h6">Solved</Typography>
              <Typography variant="p" sx={{ fontSize: '1.5rem' }}>{stats.solved}</Typography>
            </CustomCard>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  );
}

StatsBoard.propTypes = {
  stats: PropTypes.shape({
    rank: PropTypes.number,
    score: PropTypes.number,
    solved: PropTypes.number,
    aced: PropTypes.number,
    topMissions: PropTypes.arrayOf(Object),
  }).isRequired,
  dailyChallenge: PropTypes.shape({
    title: PropTypes.string,
    titleSlug: PropTypes.string,
    difficulty: PropTypes.string,
    id: PropTypes.number,
    topics: PropTypes.arrayOf(Object),
    numberOfMembersSolved: PropTypes.number,
  }).isRequired,
  totalMembers: PropTypes.number.isRequired,
};

function CustomItem({ displayData }) {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%',
    }}
    >
      <Typography variant="p" sx={{ fontWeight: 'bold' }}>{displayData.username}</Typography>
      <Typography variant="p" sx={{ fontWeight: 'bold' }}>{displayData.scoreEarned}</Typography>
    </Box>
  );
}

CustomItem.propTypes = {
  displayData: PropTypes.shape({
    username: PropTypes.string,
    scoreEarned: PropTypes.number,
  }),
};

CustomItem.defaultProps = {
  displayData: {
    username: '',
    scoreEarned: 10,
  },
};

function Leaderboard({ leaderboardData }) {
  return (
    <>
      {!leaderboardData && (
        // TODO: Add loading animation
        <Box>Loading...</Box>
      )}
      {leaderboardData && (
        <CustomCard type="normal" sx={{ display: 'box' }}>
          <CustomList
            data={leaderboardData}
            title="Leaderboard"
            totalTitle="Total users"
            ItemDisplay={CustomItem}
            showRanking
          />
        </CustomCard>
      )}
    </>
  );
}

Leaderboard.propTypes = {
  leaderboardData: PropTypes.arrayOf(Object).isRequired,
};

export default Dashboard;
