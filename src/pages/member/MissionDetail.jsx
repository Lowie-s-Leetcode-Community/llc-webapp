import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Typography, Button, useTheme, Card, Box,
  List, ListItem, ListItemText,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PropTypes from 'prop-types';

// mock mission detail function
function mockMission(missionRoute) {
  function randomData(...items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  function randomProblem(index) {
    const link = index % 2 === 0
      ? 'https://leetcode.com/problems/sqrtx/'
      : 'https://leetcode.com/problems/maximum-69-number/';
    return {
      name: `Name ${index} ${Math.random()}`,
      link,
      difficulty: randomData('Easy', 'Medium', 'Hard'),
      aced: randomData(true, false),
    };
  }

  return {
    name: missionRoute.toUpperCase(),
    desc: `A short description of the mission ${Math.random()}`,
    type: randomData('Shown', 'Hidden'),
    problemList: Array.from({ length: 7 }, (_, index) => randomProblem(index)),
  };
}
// end of mock mission detail function

function MissionDetail() {
  const { missionRoute } = useParams();
  const [missionDetail, setMissionDetail] = useState(null);

  // Uncomment this when data is taken from database
  // const MISSION_DETAIL_API = `http://localhost:3000/api/missions/${missionRoute}`;

  // useEffect(() => {
  //   fetch(MISSION_DETAIL_API)
  //     .then((response) => response.json())
  //     .then((data) => setMissionDetail(data))
  //     .catch((error) => {
  //       throw new Error(error);
  //     });
  // }, []);

  useEffect(() => {
    setMissionDetail(mockMission(missionRoute));
  }, [missionRoute]);

  const missionListLink = '/missions';
  const theme = useTheme();

  return (
    <div>
      {missionDetail ? (
        <>
          {/* Back button */}
          <Button
            color="text"
            component={Link}
            to={missionListLink}
            variant="text"
            startIcon={<ArrowBackIosNewIcon />}
            sx={{ alignItems: 'center' }}
          >
            <Typography variant="subtitle1" sx={{ marginTop: '7px' }}>
              B
              <span style={{ textTransform: 'lowercase' }}>
                ack to mission list
              </span>
            </Typography>
          </Button>

          {/* Mission name */}
          <Typography
            variant="h3"
            sx={{
              marginTop: '14px', marginBottom: '14px', fontSize: '33px', fontWeight: 'bold',
            }}
          >
            {missionDetail.name}
          </Typography>

          {/* Mission overview */}
          <Box display="flex" alignItems="left">
            <LabelValueTypography label="Aced" value={`${missionDetail.problemList.filter((problem) => problem.aced).length}/${missionDetail.problemList.length}`} />
            <LabelValueTypography label="Type" value={missionDetail.type} />
          </Box>

          {/* Mission description */}
          <Card sx={{
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.customShadows.light,
            padding: theme.spacing(2),
            textAlign: 'justify',
            backgroundColor: theme.palette.background.card,
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
          }}
          >
            {missionDetail.desc}
          </Card>

          {/* Mission problem list */}
          <ProblemList
            problemList={missionDetail.problemList}
            missionType={missionDetail.type}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function LabelValueTypography({ label, value }) {
  return (
    <Typography variant="subtitle2" sx={{ marginRight: '24px' }}>
      <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{label}</span>
      {value}
    </Typography>
  );
}

function ProblemList({ problemList, missionType }) {
  const acedProblemBackgroundColor = '#ECFDF5';
  const listIndexColor = '#4B5563';
  const shownProblemColor = '#5D52E6';
  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case 'Easy':
        return '#00AF9B';
      case 'Medium':
        return '#FFB800';
      case 'Hard':
        return '#FF2D55';
      default:
        return 'grey';
    }
  }

  const primaryTextForHiddenProblem = 'Hidden Problem';
  const secondaryTextForHiddenProblem = <VisibilityOffIcon fontSize="small" />;

  return (
    <List>
      {problemList.map((problem, index) => {
        // This bugs me.
        // It's really unoptimized but I don't know how to only check only once.
        const isHiddenProblem = missionType === 'Hidden' && !problem.aced;

        const primaryText = isHiddenProblem
          ? primaryTextForHiddenProblem : problem.name;
        const secondaryText = isHiddenProblem
          ? secondaryTextForHiddenProblem : problem.difficulty;

        const primaryColor = isHiddenProblem
          ? 'black' : shownProblemColor;
        const secondaryColor = isHiddenProblem
          ? 'grey' : getDifficultyColor(problem.difficulty);
        const iconColor = !problem.aced
          ? '#BEBEBE' : '#4CAF50';

        const primaryFontWeight = isHiddenProblem
          ? 'normal' : 'bold';

        const component = isHiddenProblem
          ? null : Link;
        const url = isHiddenProblem
          ? null : problem.link;

        return (
          <ListItem
            component={component}
            to={url}
            target="_blank"
            rel="noopener noreferrer"
            key={problem.id}
            sx={{
              backgroundColor: problem.aced ? acedProblemBackgroundColor
                : 'transparent',
              border: '1px solid #ddd',
            }}
          >
            {/* list index */}
            <Typography
              variant="h6"
              sx={{
                marginTop: '15px',
                marginBottom: '15px',
                marginLeft: '30px',
                marginRight: '47px',
                color: listIndexColor,
              }}
            >
              {index + 1}
            </Typography>

            {/* Problem */}
            <ListItemText
              primary={primaryText}
              secondary={secondaryText}
              sx={{
                '& .MuiListItemText-primary': {
                  color: primaryColor,
                  fontWeight: primaryFontWeight,
                },
                '& .MuiListItemText-secondary': {
                  color: secondaryColor,
                },
              }}
            />

            {/* Checkmark Icon */}
            <CheckCircleOutlineIcon
              sx={{
                position: 'absolute',
                top: '50%',
                right: '16px',
                transform: 'translateY(-50%)',
                color: iconColor,
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

ProblemList.propTypes = {
  problemList: PropTypes.isRequired,
  missionType: PropTypes.string.isRequired,
};

LabelValueTypography.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default MissionDetail;
