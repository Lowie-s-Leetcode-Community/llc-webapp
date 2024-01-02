import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Typography, Button, useTheme, Card, Box,
  List, ListItem, ListItemText,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// mock mission detail function
function mockMission(missionRoute) {
  function randomData(...items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  function randomLink() {
    return randomData(
      'https://leetcode.com/problems/sqrtx/',
      'https://leetcode.com/problems/maximum-69-number/',
    );
  }

  function randomProblem(index) {
    return {
      name: `Name ${index} ${Math.random()}`,
      link: randomLink(),
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

function MissionDetail() {
  const { missionRoute } = useParams();

  const MISSION_API = 'http://localhost:3000/mission/';

  const [missionDetail, setMissionDetail] = useState(null);

  useEffect(() => {
    setMissionDetail(mockMission(missionRoute));
  }, [missionRoute]);

  const missionListLink = '/missions';
  const theme = useTheme();

  return (
    <>
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
          <Typography variant="h3" sx={{ marginTop: '14px', marginBottom: '14px', fontSize: '33px', fontWeight: 'bold' }}>
            {missionDetail.name}
          </Typography>

          {/* Mission overview */}
          <Box display="flex" alignItems="left">
            <TotalAced problemList={missionDetail.problemList} />
            <MissionType missionType={missionDetail.type} />
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
    </>
  );
}

function TotalAced({ problemList }) {
  return (
    <Typography variant="subtitle2" sx={{ marginRight: '12px' }}>
      <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Aced</span>
      {problemList.filter(problem => problem.aced).length}/{problemList.length}
    </Typography>
  );
}

function MissionType({ missionType }) {
  return (
    <Typography variant="subtitle2" sx={{ marginLeft: '12px' }}>
      <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Type</span>
      {missionType}
    </Typography>
  );
}

function ProblemList({ problemList, missionType }) {
  // TODO: Continue implementing Problem list
  const acedProblemBackgroundColor = '#ECFDF5';
  const listIndexColor = '#4B5563';
  const shownProblemColor = '#5D52E6';
  // '#1BBE0A' for Easy problem.

  const primaryTextForHiddenProblem = 'Hidden Problem';
  const secondaryTextForHiddenProblem = <VisibilityOffIcon fontSize="small" />;

  return (
    <List>
      {problemList.map((problem, index) => {
        // This bugs me.
        // It's unoptimized but I don't know how to only check only once.
        const isHiddenProblem = missionType === 'Hidden' && !problem.aced;

        const primaryText = isHiddenProblem
          ? primaryTextForHiddenProblem : problem.name;
        const secondaryText = isHiddenProblem
          ? secondaryTextForHiddenProblem : problem.difficulty;

        const primaryColor = isHiddenProblem
          ? 'black' : shownProblemColor;
        const secondaryColor = isHiddenProblem
          ? 'grey' : '#1BBE0A'; // Color for the easy problem, will add more colors later.

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
            arget="_blank"
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
          </ListItem>
        );
      })}
    </List>
  );
}

export default MissionDetail;
