import React from 'react';
import {
  Grid, Card, useTheme, List, ListItem, ListItemText, Pagination,
} from '@mui/material';

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
  const theme = useTheme();

  // TODO: Move these styles to a separate file (maybe theme.js)
  const normalBackground = {
    backgroundColor: theme.palette.background.card,
  };

  const goldOrangeBackground = {
    backgroundImage: theme.palette.gradients.goldOrange,
    color: '#fff',
  };

  const cardStyle = {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows.card,
    padding: theme.spacing(2),
    textAlign: 'center',
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ ...cardStyle, ...goldOrangeBackground }}><h4>Recent Awards</h4></Card>
      </Grid>
      <Grid item xs={12} sm={3} md={1}>
        <Card sx={{ ...cardStyle, ...normalBackground }}><h4>Aced</h4></Card>
      </Grid>
      <Grid item xs={12} sm={3} md={1}>
        <Card sx={{ ...cardStyle, ...normalBackground }}><h4>Rank</h4></Card>
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <Card sx={{ ...cardStyle, ...normalBackground }}><h4>Favourite Missions</h4></Card>
      </Grid>
      <Grid item xs={12} sm={12} md={2}>
        <Card sx={{ ...cardStyle, ...normalBackground }}><h4>Solved</h4></Card>
      </Grid>
    </Grid>
  );
}

function Leaderboard() {
  const theme = useTheme();

  // Mock data for leaderboard
  const leaderboardData = [
    {
      id: 1, username: 'user1', rank: 1, aced: 50,
    },
    {
      id: 2, username: 'user2', rank: 2, aced: 45,
    },
    {
      id: 3, username: 'user3', rank: 3, aced: 40,
    },
    {
      id: 4, username: 'user4', rank: 4, aced: 35,
    },
    {
      id: 5, username: 'user5', rank: 5, aced: 30,
    },
    {
      id: 6, username: 'user6', rank: 6, aced: 25,
    },
    {
      id: 7, username: 'user7', rank: 7, aced: 20,
    },
    {
      id: 8, username: 'user8', rank: 8, aced: 15,
    },
    {
      id: 9, username: 'user9', rank: 9, aced: 10,
    },
    {
      id: 10, username: 'user10', rank: 10, aced: 5,
    },
    {
      id: 11, username: 'user11', rank: 11, aced: 0,
    },
    {
      id: 12, username: 'user12', rank: 12, aced: 0,
    },
    {
      id: 13, username: 'user13', rank: 13, aced: 0,
    },
    {
      id: 14, username: 'user14', rank: 14, aced: 0,
    },
    {
      id: 15, username: 'user15', rank: 15, aced: 0,
    },
    {
      id: 16, username: 'user16', rank: 16, aced: 0,
    },
    {
      id: 17, username: 'user17', rank: 17, aced: 0,
    },
    {
      id: 18, username: 'user18', rank: 18, aced: 0,
    },
    {
      id: 19, username: 'user19', rank: 19, aced: 0,
    },
    {
      id: 20, username: 'user20', rank: 20, aced: 0,
    },
  ];

  // Pagination
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  return (
    <Card sx={{
      borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows.card, padding: theme.spacing(2), textAlign: 'center', backgroundColor: theme.palette.background.card, marginTop: theme.spacing(2),
    }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h4 style={{ margin: theme.spacing(2), textAlign: 'left' }}>Leaderboard</h4>
        </Grid>
        <Grid item>
          <h4 style={{ margin: theme.spacing(2), textAlign: 'right' }}>
            Total Users:
            {' '}
            {leaderboardData.length}
          </h4>
        </Grid>
      </Grid>
      <List>
        {leaderboardData.slice((page - 1) * 10, page * 10).map((user, index) => (
          <ListItem
            key={user.id}
            sx={{
              borderRadius: theme.shape.borderRadius,
              backgroundColor: index % 2 === 0 ? theme.palette.grey[200]
                : 'transparent',
              margin: theme.spacing(1),
            }}
          >
            <ListItemText primary={user.username} secondary={`Rank: ${user.rank} | Missions aced: ${user.aced}`} />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={Math.ceil(leaderboardData.length / 10)}
        page={page}
        onChange={handleChangePage}
      />
    </Card>
  );
}

export default Dashboard;
