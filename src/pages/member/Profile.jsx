import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Button, Avatar, List, ListItemAvatar, ListItemText, ListItemButton, Box, Card,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PropTypes from 'prop-types';
import CustomList from '../../components/CustomList';
import CustomGridItem from '../../components/CustomGridItem';

function Profile() {
  const [selectedTab, setSelectedTab] = useState('allAwardsTab');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ display: 'flex', overflow: 'hidden' }}>
      <Sidebar selectedTab={selectedTab} handleTabChange={handleTabChange} />
      <MainContent selectedTab={selectedTab} />
    </div>
  );
}

function Sidebar({ selectedTab, handleTabChange }) {
  return (
    <Card sx={{ padding: '16px', minWidth: 250, borderRadius: '20px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar alt="User Avatar" style={{ width: '80px', height: '80px', marginBottom: '16px' }} />
        <Typography variant="h5" sx={{ marginBottom: '16px' }}>
          username
        </Typography>
      </Box>

      <List>
        <ListItemButton selected={selectedTab === 'allAwardsTab'} onClick={(event) => handleTabChange(event, 'allAwardsTab')}>
          <ListItemAvatar>
            <EmojiEvents />
          </ListItemAvatar>
          <ListItemText primary="All Awards" />
        </ListItemButton>
        <ListItemButton selected={selectedTab === 'recentACTab'} onClick={(event) => handleTabChange(event, 'recentACTab')}>
          <ListItemAvatar>
            <TaskAltIcon />
          </ListItemAvatar>
          <ListItemText primary="Recent AC" />
        </ListItemButton>
      </List>
      <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '24px', marginBottom: '16px', borderRadius: '16px' }}>
        Change Profile Info
      </Button>
    </Card>
  );
}

Sidebar.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};

function MainContent({ selectedTab }) {
  return (
    <Box sx={{
      flexGrow: 1, paddingLeft: '24px', paddingRight: '24px',
    }}
    >
      {selectedTab === 'allAwardsTab' && (
        <AllAwards />
      )}
      {selectedTab === 'recentACTab' && (
        <RecentACList />
      )}
    </Box>
  );
}

MainContent.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

function AllAwards() {
  const AWARDS_API = 'http://localhost:3000/api/profile/awards';
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    fetch(AWARDS_API)
      .then((response) => response.json())
      .then((data) => setAwards(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <Card>
      <Typography variant="h6" sx={{ paddingLeft: '16px', paddingBottom: '16px' }}>All Awards</Typography>
      <Grid container spacing={3}>
        {awards.map((award) => (
        // eslint-disable-next-line dot-notation
          <CustomGridItem key={award['_id']} id={award['_id']} sx={{ backgroundColor: '#ffffff' }}>
            <Typography variant="h6">{award.title}</Typography>
          </CustomGridItem>
        ))}
      </Grid>
    </Card>

  );
}

function RecentACList() {
  // Mock data for Recent AC list
  const RECENT_AC_API = 'http://localhost:3000/api/profile/recentAC';
  const [recentACData, setRecentACData] = useState([]);

  useEffect(() => {
    fetch(RECENT_AC_API)
      .then((response) => response.json())
      .then((data) => setRecentACData(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <Card>
      <CustomList data={recentACData} title="Recent AC" totalTitle="Total AC" primaryData="name" secondaryData="date" />
    </Card>

  );
}

export default Profile;
