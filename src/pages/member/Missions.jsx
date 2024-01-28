import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Typography, Card, Box,
} from '@mui/material';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PropTypes from 'prop-types';
import IconLabelValueTypography from './IconLabelValueTypography';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import axios from '../../config/axios.interceptor';

function Missions() {
  const serverUrl = process.env.REACT_APP_SERVER_API_URL;
  const userId = localStorage.getItem('userId');
  const MISSIONS_API = `${serverUrl}/api/users/${userId}/missions/all`;
  const username = localStorage.getItem('username');

  const [missions, setMissions] = useState(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get(MISSIONS_API);
        setMissions(response.data.slice().sort((a, b) => a.progress <= b.progress));
      } catch (error) {
        throw new Error(error);
      }
    };
    // TODO: fetch using /:id/rank
    // data is from response.data.rank

    fetchMissions();
  }, []);

  const theme = useTheme();
  return (
    <div>
      {missions ? (
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
                {username}
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
                label="Solved"
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

          <Box>
            <Grid container spacing={3}>
              {missions.map((mission) => (
                <MissionGridItem
                  id={mission.id}
                  key={`mission-grid-item-${mission.id}`}
                  missionRoute={`/missions/${mission.id}`}
                >
                  <Typography variant="h6" sx={{ mb: 1, margin: '0' }} key={`mission-name-${mission.id}`}>
                    {mission.name}
                  </Typography>
                  <CircularProgressWithLabel
                    baseCircularProgress={(
                      <CircularProgress
                        style={{ width: '4rem', height: '4rem' }}
                        sx={{
                          color: theme.palette.accent.main,
                          [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                          },
                        }}
                        variant="determinate"
                        value={(mission.userSolvedProblems / mission.problemCount) * 100}
                        thickness={4}
                      />
                    )}
                    label={`${mission.userSolvedProblems} / ${mission.problemCount}`}
                  />
                </MissionGridItem>
              ))}
            </Grid>
          </Box>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function MissionGridItem({
  id, missionRoute, children,
}) {
  // CustomGridItem in src/components
  //  but with dynamic background support
  const theme = useTheme();

  return (
    <Grid item xs={6} sm={4} md={3} sx={{ height: '10rem' }} key={`mission-box-${id}`}>
      <Link
        to={missionRoute}
        style={{
          textDecoration: 'none',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '1rem',
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
              backgroundColor: theme.palette.background.card,
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
  missionRoute: PropTypes.string,
};

MissionGridItem.defaultProps = {
  missionRoute: '#',
};

export default Missions;
