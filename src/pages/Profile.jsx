import React, { useState } from 'react';
import {
  Grid, Paper, Typography, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Card,
  Pagination, useTheme,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function Profile() {
  // Mock data for awards
  const awards = [
    { id: 1, title: 'Award Name' },
    { id: 2, title: 'Award Name' },
    { id: 3, title: 'Award Name' },
    { id: 4, title: 'Award Name' },
    { id: 5, title: 'Award Name' },
  ];

  const [selectedTab, setSelectedTab] = useState('All Awards');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#fff', padding: '16px', minWidth: 250 }}>
        <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" style={{ width: '80px', height: '80px', marginBottom: '16px' }} />
        <Typography variant="h5" style={{ marginBottom: '16px' }}>
          John&rsquo;s Profile
        </Typography>
        <List>
          <ListItem button selected={selectedTab === 'All Awards'} onClick={(event) => handleTabChange(event, 'All Awards')} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <ListItemAvatar>
              <EmojiEvents />
            </ListItemAvatar>
            <ListItemText primary="All Awards" />
          </ListItem>
          <ListItem button selected={selectedTab === 'Recent AC'} onClick={(event) => handleTabChange(event, 'Recent AC')} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <ListItemAvatar>
              <TaskAltIcon />
            </ListItemAvatar>
            <ListItemText primary="Recent AC" />
          </ListItem>
        </List>
        <Button variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
          Change Profile Info
        </Button>
      </div>
      <div style={{ flexGrow: 1, padding: '24px', backgroundColor: '#f5f5f5' }}>
        {selectedTab === 'All Awards' && (
          <Grid container spacing={3}>
            {awards.map((award) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={award.id}>
                <Paper elevation={3} style={{ padding: '16px', textAlign: 'center', height: '100%' }}>
                  <Typography variant="h6">{award.title}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        {selectedTab === 'Recent AC' && (
          <RecentACList />
        )}
      </div>
    </div>
  );
}

function RecentACList() {
  const theme = useTheme();

  // Mock data for Recent AC list
  const recentACData = [
    { id: 1, name: 'AC 1', date: '2021-10-01' },
    { id: 2, name: 'AC 2', date: '2021-09-28' },
    { id: 3, name: 'AC 3', date: '2021-09-25' },
    { id: 4, name: 'AC 4', date: '2021-09-22' },
    { id: 5, name: 'AC 5', date: '2021-09-19' },
    { id: 6, name: 'AC 6', date: '2021-09-16' },
    { id: 7, name: 'AC 7', date: '2021-09-13' },
    { id: 8, name: 'AC 8', date: '2021-09-10' },
    { id: 9, name: 'AC 9', date: '2021-09-07' },
    { id: 10, name: 'AC 10', date: '2021-09-04' },
    { id: 11, name: 'AC 11', date: '2021-09-01' },
    { id: 12, name: 'AC 12', date: '2021-08-29' },
    { id: 13, name: 'AC 13', date: '2021-08-26' },
    { id: 14, name: 'AC 14', date: '2021-08-23' },
    { id: 15, name: 'AC 15', date: '2021-08-20' },
    { id: 16, name: 'AC 16', date: '2021-08-17' },
    { id: 17, name: 'AC 17', date: '2021-08-14' },
    { id: 18, name: 'AC 18', date: '2021-08-11' },
    { id: 19, name: 'AC 19', date: '2021-08-08' },
    { id: 20, name: 'AC 20', date: '2021-08-05' },
    { id: 21, name: 'AC 21', date: '2021-08-02' },
    { id: 22, name: 'AC 22', date: '2021-07-30' },
    { id: 23, name: 'AC 23', date: '2021-07-27' },
    { id: 24, name: 'AC 24', date: '2021-07-24' },
    { id: 25, name: 'AC 25', date: '2021-07-21' },
    { id: 26, name: 'AC 26', date: '2021-07-18' },
    { id: 27, name: 'AC 27', date: '2021-07-15' },
    { id: 28, name: 'AC 28', date: '2021-07-12' },
    { id: 29, name: 'AC 29', date: '2021-07-09' },
    { id: 30, name: 'AC 30', date: '2021-07-06' },
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
          <h4 style={{ margin: theme.spacing(2), textAlign: 'left' }}>Recent AC</h4>
        </Grid>
        <Grid item>
          <h4 style={{ margin: theme.spacing(2), textAlign: 'right' }}>Solved Problems: 50</h4>
        </Grid>
      </Grid>
      <List>
        {recentACData.slice((page - 1) * 10, page * 10).map((ac, index) => (
          <ListItem
            key={ac.id}
            sx={{
              borderRadius: theme.shape.borderRadius,
              backgroundColor: index % 2 === 0 ? theme.palette.grey[200]
                : 'transparent',
              margin: theme.spacing(1),
            }}
          >
            <ListItemText primary={ac.name} secondary={ac.date} />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={Math.ceil(recentACData.length / 10)}
        page={page}
        onChange={handleChangePage}
      />
    </Card>
  );
}

export default Profile;
