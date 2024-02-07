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
import PageTitle from '../../components/PageTitle';
import NoDataFound from '../../components/NoDataFound';

const sidebarHeight = '23rem';

function Profile() {
  const [selectedTab, setSelectedTab] = useState('allAwardsTab');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Box>
        <PageTitle title="profile" includeUsername />
      </Box>
      <Box style={{ display: 'flex', overflow: 'hidden' }}>
        <Sidebar selectedTab={selectedTab} handleTabChange={handleTabChange} />
        <MainContent selectedTab={selectedTab} />
      </Box>
    </>

  );
}

function Sidebar({ selectedTab, handleTabChange }) {
  const serverUrl = process.env.REACT_APP_SERVER_API_URL;
  const username = localStorage.getItem('username');
  const avatar = localStorage.getItem('avatar');
  const discordId = localStorage.getItem('discordId');
  const userId = localStorage.getItem('userId');
  const LEETCODE_USERNAME_API = `${serverUrl}/api/users/${userId}/leetcode-username/`;
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  useEffect(() => {
    axios.get(LEETCODE_USERNAME_API)
      .then((response) => {
        setLeetcodeUsername(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);
  const avatarSize = '5rem';
  const avatarFontSize = `calc(${avatarSize} / 2)`;
  return (
    <Card sx={{
      padding: '1rem',
      minWidth: '16.625rem',
      height: sidebarHeight,
      borderRadius: '1.25rem',
    }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {avatar === 'null' ? (
          <Avatar
            alt="User Avatar"
            sx={{
              width: avatarSize, height: avatarSize, marginBottom: '1rem', fontSize: avatarFontSize,
            }}
          >
            {username.charAt(0)}
          </Avatar>
        ) : (
          <Avatar src={`https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png`} alt="User Avatar" sx={{ width: avatarSize, height: avatarSize, marginBottom: '1rem' }} />
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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '1.5rem', marginBottom: '1rem', borderRadius: '1rem' }}
        onClick={() => window.open(`https://leetcode.com/${leetcodeUsername}/`, '_blank')}
      >
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
  const serverUrl = process.env.REACT_APP_SERVER_API_URL;
  const userId = localStorage.getItem('userId');
  const AWARDS_API = `${serverUrl}/api/users/${userId}/awards/`;
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    axios.get(AWARDS_API)
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          ...item,
          date: formatDate(item.date),
        }));
        setAwards(formattedData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);
  // const theme = useTheme();

  return (
    <Card sx={{ minHeight: sidebarHeight }}>
      <Typography variant="h5" sx={{ padding: '1rem', fontWeight: 'bold' }}>
        All Awards
      </Typography>
      { awards && awards.length !== 0 ? (
        <Grid container spacing={3}>
          {awards.map((award) => (
            <AwardGridItem award={award} key={award.id} />
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
  const RECENT_AC_API = `${serverUrl}/api/users/${userId}/recent-acs/`;
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

function AwardGridItem({ award }) {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={2} key={award.id}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: '10px',
          boxShadow: 0,
          '&:hover': {
            transition: 'all 0.2s ease-in-out',
            border: `1px solid ${theme.palette.primary.main}`,
          },
          border: `1px solid ${theme.palette.secondary.main}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '10px',
          }}
        >
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
          }}
          >
            <img src={award.image} alt="award" style={{ maxWidth: '100%', maxHeight: '50px' }} />
          </Box>
          <Typography variant="h6">{award.name}</Typography>
        </Box>
      </Card>
    </Grid>
  );
}

AwardGridItem.propTypes = {
  award: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    desciption: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
