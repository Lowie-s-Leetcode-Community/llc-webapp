import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Button, Avatar, List, ListItemAvatar,
  ListItemText, ListItemButton, Box, Card, useTheme,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PropTypes from 'prop-types';
import formatDate from '../../utils/dateUtils';
import axios from '../../config/axios.interceptor';
import CustomList from '../../components/CustomList';
import CustomGridItem from '../../components/CustomGridItem';
import NoDataFound from '../../components/NoDataFound';

const sidebarHeight = '23rem';

function Profile() {
  const theme = useTheme();
  const username = localStorage.getItem('username');
  const [selectedTab, setSelectedTab] = useState('allAwardsTab');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Box>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          <Box component="span" sx={{ color: theme.palette.primary.main }}>
            {username}
          </Box>
          &apos;s dashboard
        </Typography>
      </Box>
      <Box style={{ display: 'flex', overflow: 'hidden' }}>
        <Sidebar selectedTab={selectedTab} handleTabChange={handleTabChange} />
        <MainContent selectedTab={selectedTab} />
      </Box>
    </>

  );
}

function Sidebar({ selectedTab, handleTabChange }) {
  const username = localStorage.getItem('username');
  const avatar = localStorage.getItem('avatar');
  const discordId = localStorage.getItem('discordId');
  const avatarSize = '5rem';
  const fontSize = `calc(${avatarSize} / 2)`;
  return (
    <Card sx={{
      padding: '1rem',
      minWidth: '16.625rem',
      height: sidebarHeight,
      borderRadius: '1.25rem',
    }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {avatar === null ? (
          <Avatar src={`https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png`} alt="User Avatar" sx={{ width: avatarSize, height: avatarSize, marginBottom: '1rem' }} />
        ) : (
          <Avatar
            alt="User Avatar"
            sx={{
              width: avatarSize, height: avatarSize, marginBottom: '1rem', fontSize,
            }}
          >
            {username.charAt(0)}
          </Avatar>
        )}
        <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
          {username}
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
      <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '1.5rem', marginBottom: '1rem', borderRadius: '1rem' }}>
        Visit Leetcode Profile
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
      flexGrow: 1, paddingLeft: '1.5rem', paddingRight: '1.5rem',
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
  const awards = [];
  const theme = useTheme();

  return (
    <Card sx={{ minHeight: sidebarHeight }}>
      <Typography variant="h5" sx={{ padding: '1rem', fontWeight: 'bold' }}>
        All Awards
      </Typography>
      { awards.length !== 0 ? (
        <Grid container spacing={3}>
          {awards.map((award) => (
            <CustomGridItem
              key={award.id}
              id={award.id}
              sx={{ backgroundColor: theme.background.default }}
            >
              <Typography variant="h6">{award.title}</Typography>
            </CustomGridItem>
          ))}
        </Grid>
      ) : (
        <Box style={{
          display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <NoDataFound />
        </Box>

      )}
    </Card>
  );
}

function RecentACList() {
  const serverUrl = process.env.REACT_APP_SERVER_API_URL;
  const userId = localStorage.getItem('userId');
  const RECENT_AC_API = `${serverUrl}/api/users/${userId}/profile/`;
  const [recentACData, setRecentACData] = useState([]);

  useEffect(() => {
    axios.get(RECENT_AC_API)
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          ...item,
          date: formatDate(item.date),
        }));
        setRecentACData(formattedData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <Card sx={{ minHeight: sidebarHeight }}>
      <CustomList
        data={recentACData}
        title="Recent AC"
        totalTitle="Total AC"
        primaryData="name"
        secondaryData="date"
      />
    </Card>
  );
}

export default Profile;
