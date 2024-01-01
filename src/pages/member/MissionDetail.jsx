import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Grid, Typography, Button, useTheme, Card, Avatar, 
  List, ListItemAvatar, ListItemText, ListItemButton, Box,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import PropTypes from 'prop-types';
import CustomList from '../components/CustomList';
import CustomGridItem from '../components/CustomGridItem';



// mock mission detail function
function mockMission(missionRoute) {
  function randomData(a, b) {
    return Math.random() < 0.5 ? a : b;
  }

  function randomLink() {
    return randomData(
      'https://leetcode.com/problems/sqrtx/',
      'https://leetcode.com/problems/maximum-69-number/'
    )
  }

  return {
    name: missionRoute.toUpperCase(),
    desc: 'A short description of the mission ' + Math.random(),
    type: randomData('Shown', 'Hidden'),
    problemList: [
      {
        id: 1,
        name: 'Name 1',
        link: randomLink(),
        difficulty: randomData('Easy', 'Not Easy'),
        aced: randomData(true, false),
      },
      {
        id: 2,
        name: 'Name 2',
        link: randomLink(),
        difficulty: randomData('Easy', 'Not Easy'),
        aced: randomData(true, false),
      },
      {
        id: 3,
        name: 'Name 3',
        link: randomLink(),
        difficulty: randomData('Easy', 'Not Easy'),
        aced: randomData(true, false),
      }
    ],
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
          <Button
            color='text'
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

          <Typography variant="h3" sx={{ marginTop: '14px', marginBottom: '14px', fontSize: '33px', fontWeight: 'bold'}}>
            {missionDetail.name}
          </Typography>

          <Box display="flex" alignItems="left">
            <TotalAced problemList={missionDetail.problemList}/>
            <ProblemType problemType={missionDetail.type}/>
          </Box>
          
          <Card sx={{
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.customShadows.light,
            padding: theme.spacing(2),
            textAlign: 'justify',
            backgroundColor: theme.palette.background.card,
            marginTop: theme.spacing(2),
          }}
          >
            {missionDetail.desc}
          </Card>

          <CustomList
            data={missionDetail.problemList}
            primaryData="name"
            secondaryData="difficulty"
          />
          {/* TODO: <ProblemList problemList={missionDetail.problemList} /> */}

        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

function TotalAced({ problemList }) {
  return (
    <>
      <Typography variant="subtitle2" sx={{ marginRight: '12px' }}>
      <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Aced</span>  {problemList.filter(problem => problem.aced).length}/{problemList.length}
    </Typography>
    </>
  );
}

function ProblemType({ problemType }) {
  return (
    <>
      <Typography variant="subtitle2" sx={{ marginLeft: '12px' }}>
        <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Type</span>  {problemType}
      </Typography>
    </>
  );
}

function ProblemList({ problemList }) {
  // TODO: Implement Problem list, currently just a copy-paste.
  return (
    <Card sx={{
      borderRadius: theme.shape.borderRadius, boxShadow: theme.customShadows.light, padding: theme.spacing(2), textAlign: 'center', backgroundColor: theme.palette.background.card, marginTop: theme.spacing(2),
    }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h4 style={{ margin: theme.spacing(2), textAlign: 'left' }}>{title}</h4>
        </Grid>
        <Grid item>
          <h4 style={{ margin: theme.spacing(2), textAlign: 'right' }}>
            {totalTitle}
            {': '}
            {data.length}
          </h4>
        </Grid>
      </Grid>
      <List>
        {data.slice((page - 1) * paginationCount, page * paginationCount).map((item, index) => (
          <ListItem
            key={item.id}
            sx={{
              borderRadius: theme.shape.borderRadius,
              backgroundColor: index % 2 === 0 ? theme.palette.grey[200]
                : 'transparent',
              margin: theme.spacing(1),
            }}
          >
            <ListItemText primary={item[primaryData]} secondary={`${secondaryTitle} ${item[secondaryData]}`} />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={Math.ceil(data.length / paginationCount)}
        page={page}
        onChange={handleChangePage}
      />
    </Card>
  );
}

export default MissionDetail;
