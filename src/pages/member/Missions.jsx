import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CircularProgress, Grid, Typography, Card, Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
// import useFetch from '../hooks/useFetch';
import PropTypes from 'prop-types';
import CustomContainer from '../../components/CustomContainer';

function Missions() {
  // const MISSIONS_API = 'http://localhost:3000/missions';
  // eslint-disable-next-line no-unused-vars
  // const { missions, isLoading, error } = useFetch(MISSIONS_API);
  const [missions, setMissions] = useState([]);

  // Mock mission data
  const mockMissions = [
    {
      id: 1,
      name: 'mission-progress-20',
      progress: 20,
      route: 'mission-progress-20',
    },
    {
      id: 2,
      name: 'mission-progress-60',
      progress: 60,
      route: 'mission-progress-60',
    },
    {
      id: 3,
      name: 'mission-progress-80.99',
      progress: 80.99,
      route: 'mission-progress-80.99',
    },
    {
      id: 4,
      name: 'mission-progress-10',
      progress: 10,
      route: 'mission-progress-10',
    },
    {
      id: 5,
      name: 'mission-progress-100',
      progress: 100,
      route: 'mission-progress-100',
    },
  ];

  useEffect(() => {
    setMissions(mockMissions.slice().sort((a, b) => a.progress <= b.progress));
  }, []);

  const theme = useTheme();
  return (
    <>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>
          <span style={{ color: theme.palette.primary.main }}>
            Username
          </span>
          &apos;s missions
        </h3>
        <Box
          style={{
            borderRadius: 16,
            backgroundColor: theme.palette.background.card,
            boxShadow: theme.customShadows.light,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          p={1}
        >
          <IconLabelValueTypography
            icon={<EmojiEventsIcon sx={{ color: theme.palette.primary.main }} />}
            label="Aced"
            value={`${missions.filter((mission) => mission.progress === 100).length}/${missions.length}`}
          />
          <div style={{ marginRight: '24px' }} />
          <IconLabelValueTypography
            icon={<MilitaryTechIcon sx={{ color: theme.palette.primary.main }} />}
            label="Rank"
            value="1/6969"
          />
        </Box>
      </Box>

      <CustomContainer>
        <Grid container spacing={3}>
          {missions.map((mission) => (
            <MissionGridItem
              id={mission.id}
              missionProgress={mission.progress}
              missionRoute={`/mission/${mission.route}`}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                {mission.name}
              </Typography>
              { mission.progress === 100 ? (
                <CheckCircleOutlineIcon
                  sx={{
                    fontSize: '2.25rem',
                    color: '#f8f4f4', // because theme.palette.background.main doesn't work, it returned black.
                  }}
                />
              ) : (
                <CircularProgress
                  sx={{ width: '1.5rem', height: '1.5rem', color: theme.palette.accent.main }}
                  variant="determinate"
                  value={mission.progress}
                />
              )}
            </MissionGridItem>
          ))}
        </Grid>
      </CustomContainer>
    </>
  );
}

function IconLabelValueTypography({ icon = '', label, value }) {
  return (
    <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
      {icon}
      <Typography variant="subtitle2">
        <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{label}</span>
        {value}
      </Typography>
    </Box>
  );
}

function MissionGridItem({
  id, missionProgress, missionRoute, children,
}) {
  // Near copy-paste of CustomGridItem in src/components
  const theme = useTheme();
  const backgroundColor = missionProgress === 100
    ? theme.palette.accent.main : theme.palette.background.main;

  return (
    <Grid item xs={6} sm={4} md={3} key={id}>
      <Link to={missionRoute} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '10px',
            boxShadow: 1,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 4,
            },
            '&:active': {
              transform: 'scale(0.95)',
              boxShadow: 4,
            },
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
              backgroundColor, // the only change compared to CustomGridItem.
            }}
          >
            {children}
          </Box>
        </Card>
      </Link>
    </Grid>
  );
}

IconLabelValueTypography.propTypes = {
  icon: PropTypes,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

IconLabelValueTypography.defaultProps = {
  icon: '',
};

MissionGridItem.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  missionProgress: PropTypes.number.isRequired,
  missionRoute: PropTypes.string,
};

MissionGridItem.defaultProps = {
  missionRoute: '#',
};

export default Missions;
