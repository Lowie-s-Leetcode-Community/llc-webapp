import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PropTypes from 'prop-types';
import CustomList from '../components/CustomList';
import CustomGridItem from '../components/CustomGridItem';

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
    <div style={{ backgroundColor: '#fff', padding: '16px', minWidth: 250 }}>
      <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" style={{ width: '80px', height: '80px', marginBottom: '16px' }} />
      <Typography variant="h5" style={{ marginBottom: '16px' }}>
        John&rsquo;s Profile
      </Typography>
      <List>
        <ListItem button selected={selectedTab === 'allAwardsTab'} onClick={(event) => handleTabChange(event, 'allAwardsTab')}>
          <ListItemAvatar>
            <EmojiEvents />
          </ListItemAvatar>
          <ListItemText primary="All Awards" />
        </ListItem>
        <ListItem button selected={selectedTab === 'recentACTab'} onClick={(event) => handleTabChange(event, 'recentACTab')}>
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
  );
}

Sidebar.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};

function MainContent({ selectedTab }) {
  return (
    <div style={{ flexGrow: 1, padding: '24px', backgroundColor: '#f5f5f5' }}>
      {selectedTab === 'allAwardsTab' && (
        <AllAwards />
      )}
      {selectedTab === 'recentACTab' && (
        <RecentACList />
      )}
    </div>
  );
}

MainContent.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

function AllAwards() {
  const AWARDS_API = 'http://localhost:3000/awards';
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
    <Grid container spacing={3}>
      {awards.map((award) => (
        <CustomGridItem><Typography variant="h6">{award.title}</Typography></CustomGridItem>
      ))}
    </Grid>
  );
}

function RecentACList() {
  // Mock data for Recent AC list
  const RECENT_AC_API = 'http://localhost:3000/recentAC';
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
    <CustomList data={recentACData} title="Recent AC" totalTitle="Total AC" primaryData="name" secondaryData="date" />
  );
}

export default Profile;
