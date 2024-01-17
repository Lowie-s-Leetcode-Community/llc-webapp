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
import LabelValueTypography from './LabelValueTypography';

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
      id: index,
      name: `Problem No. ${index + 1} - ${Math.random().toFixed(Math.floor(Math.random() * 20) + 8)}`,
      link,
      difficulty: randomData('Easy', 'Medium', 'Hard'),
      aced: randomData(true, false),
    };
  }

  return {
    name: `Mission ${missionRoute.toUpperCase()} - thiS tExT iS ranDOmlY CApiTAlIZeD.`,
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
  // const MISSION_DETAIL_API = `${process.env.REACT_APP_SERVER_API_URL}
  //   /api/missions/${missionRoute}`;

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
            <Typography sx={{ marginTop: '0.318rem', textTransform: 'none' }}>
              Back to mission list
            </Typography>
          </Button>

          {/* Mission name */}
          <Typography
            variant="h3"
            sx={{
              marginTop: '0.636rem',
              marginBottom: '0.636rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textTransform: 'none',
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

function ProblemList({ problemList, missionType }) {
  const theme = useTheme();

  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case 'Easy':
        return theme.leetcodeProblem.easy.main;
      case 'Medium':
        return theme.leetcodeProblem.medium.main;
      case 'Hard':
        return theme.leetcodeProblem.hard.main;
      default:
        return theme.error.main;
        // this should never return but switch case forces a 'default' case.
    }
  }

  return (
    <List>
      {problemList.map((problem, index) => {
        // This bugs me.
        // It's really unoptimized but I don't know how to only check only once.
        const isHiddenProblem = missionType === 'Hidden' && !problem.aced;

        const problemName = isHiddenProblem
          ? 'Hidden Problem' : problem.name;
        const problemDifficulty = isHiddenProblem
          ? <VisibilityOffIcon fontSize="small" /> : problem.difficulty;

        const problemNameColor = isHiddenProblem
          ? theme.palette.grey.dark : theme.palette.link.text;
        const problemDifficultyColor = isHiddenProblem
          ? theme.palette.grey.default : getDifficultyColor(problem.difficulty);
        const AcedIconColor = !problem.aced
          ? theme.palette.grey.dark : theme.palette.success.main;

        return (
          <ListItem
            component={isHiddenProblem ? 'div' : Link}
            to={isHiddenProblem ? '#' : problem.link}
            target="_blank"
            rel="noopener noreferrer"
            key={problem.id}
            sx={{
              backgroundColor: problem.aced ? theme.palette.success.background
                : 'transparent',
              border: '0.05rem solid #ddd',
            }}
          >
            {/* list index */}
            <Typography
              key={`list-index-${problem.id}`}
              variant="h6"
              sx={{
                marginTop: '0.682rem',
                marginBottom: '0.682rem',
                marginLeft: '1.364rem',
                marginRight: '2.136rem',
                color: theme.palette.grey.text,
              }}
            >
              {index + 1}
            </Typography>

            {/* Problem name and difficulty */}
            <ListItemText
              key={`problem-info-${problem.id}`}
              primary={problemName}
              secondary={problemDifficulty}
              sx={{
                '& .MuiListItemText-primary': {
                  color: problemNameColor,
                  fontWeight: isHiddenProblem ? 'normal' : 'bold',
                },
                '& .MuiListItemText-secondary': {
                  color: problemDifficultyColor,
                },
              }}
            />

            {/* Checkmark Icon */}
            <CheckCircleOutlineIcon
              key={`checkmark-${problem.id}`}
              sx={{
                position: 'absolute',
                top: '50%',
                right: '0.727rem',
                transform: 'translateY(-50%)',
                color: AcedIconColor,
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

const problemListShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  aced: PropTypes.bool.isRequired,
});

ProblemList.propTypes = {
  problemList: PropTypes.arrayOf(problemListShape).isRequired,
  missionType: PropTypes.string.isRequired,
};

export default MissionDetail;
