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
import axios from '../../config/axios.interceptor';
import LabelValueTypography from './LabelValueTypography';

function MissionDetail() {
  const { missionRoute } = useParams();
  const serverUrl = process.env.REACT_APP_SERVER_API_URL;
  const userId = localStorage.getItem('userId');
  const MISSION_DETAIL_API = `${serverUrl}/api/users/${userId}/missions/${missionRoute}`;
  const [missionDetail, setMissionDetail] = useState(null);

  useEffect(() => {
    const fetchMissionDetail = async () => {
      try {
        const response = await axios.get(MISSION_DETAIL_API);
        setMissionDetail(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchMissionDetail();
  }, []);

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
            {missionDetail.missionName}
          </Typography>

          {/* Mission overview */}
          <Box display="flex" alignItems="left">
            <LabelValueTypography label="Solved" value={`${missionDetail.problems.filter((problem) => problem.solved).length}/${missionDetail.problems.length}`} />
            <LabelValueTypography label="Type" value={missionDetail.isHidden ? 'Hidden' : 'Shown'} />
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
            {missionDetail.description}
          </Card>

          {/* Mission problem list */}
          <ProblemList
            problems={missionDetail.problems}
            isHiddenMission={missionDetail.isHidden}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function ProblemList({ problems, isHiddenMission }) {
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
        return theme.palette.error.main;
        // this should never return but switch case forces a 'default' case.
    }
  }

  return (
    <List>
      {problems.map((problem) => {
        const isHiddenProblem = isHiddenMission && !problem.solved;

        const problemId = isHiddenProblem
          ? '?' : problem.id;
        const problemName = isHiddenProblem
          ? 'Hidden Problem' : problem.title;
        const problemDifficulty = isHiddenProblem
          ? <VisibilityOffIcon fontSize="small" /> : problem.difficulty;

        const problemNameColor = isHiddenProblem
          ? theme.palette.grey.dark : theme.palette.link.text;
        const problemDifficultyColor = isHiddenProblem
          ? theme.palette.grey.default : getDifficultyColor(problem.difficulty);
        const AcedIconColor = !problem.solved
          ? theme.palette.grey.dark : theme.palette.success.main;

        return (
          <ListItem
            component={isHiddenProblem ? 'div' : Link}
            to={isHiddenProblem ? '#' : `https://leetcode.com/problems/${problem.titleSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            key={problem.id}
            sx={{
              backgroundColor: problem.solved ? theme.palette.success.background
                : 'transparent',
              border: '0.05rem solid #ddd',
            }}
          >
            {/* problem id */}
            <Typography
              key={`problem-id-${problem.id}`}
              variant="h6"
              sx={{
                marginTop: '0.682rem',
                marginBottom: '0.682rem',
                marginLeft: '0rem',
                marginRight: '0.5rem',
                color: theme.palette.grey.text,
                width: '4.2069rem',
                textAlign: 'center',
              }}
            >
              {problemId}
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

const problemsShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  solved: PropTypes.bool.isRequired,
});

ProblemList.propTypes = {
  problems: PropTypes.arrayOf(problemsShape).isRequired,
  isHiddenMission: PropTypes.bool.isRequired,
};

export default MissionDetail;
