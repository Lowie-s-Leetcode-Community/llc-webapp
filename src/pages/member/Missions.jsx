import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CircularProgress, Grid, Typography, Card, Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PropTypes from 'prop-types';
import CustomContainer from '../../components/CustomContainer';
import IconLabelValueTypography from './IconLabelValueTypography';

function Missions() {
  const MISSIONS_API = 'http://localhost:3000/api/missions/';
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetch(MISSIONS_API)
      .then((response) => response.json())
      .then((data) => {
        setMissions(data.slice().sort((a, b) => a.progress <= b.progress));
      })
      .catch((error) => {
        throw new Error(error);
      });
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
          <div style={{ marginRight: '1rem' }} />
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
              key={`mission-grid-item-${mission.id}`}
              missionProgress={mission.progress}
              missionRoute={mission.route}
            >
              <Typography variant="h6" sx={{ mb: 1 }} key={`mission-name-${mission.id}`}>
                {mission.name}
              </Typography>
              { mission.progress === 100 ? (
                <CheckCircleOutlineIcon
                  key={`mission-checkmark-${mission.id}`}
                  sx={{
                    fontSize: '2.25rem',
                    color: '#f8f4f4', // because theme.palette.background.main doesn't work, it returned black.
                  }}
                />
              ) : (
                <CircularProgress
                  key={`mission-progress-${mission.id}`}
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

function MissionGridItem({
  id, missionProgress, missionRoute, children,
}) {
  // CustomGridItem in src/components
  //  but with dynamic background support
  const theme = useTheme();
  const backgroundColor = missionProgress === 100
    ? theme.palette.accent.main : theme.palette.background.main;

  return (
    <Grid item xs={6} sm={4} md={3} key={`mission-box-${id}`}>
      <Link to={missionRoute} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '0.454rem',
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
              padding: '0.454rem',
              backgroundColor,
            }}
          >
            {children}
          </Box>
        </Card>
      </Link>
    </Grid>
  );
}

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
