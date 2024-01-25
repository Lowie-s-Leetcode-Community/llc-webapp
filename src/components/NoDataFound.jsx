import React from 'react';
import { Box, Typography } from '@mui/material';
import noDataIcon from '../assets/images/no_data_icon.png';

function NoDataFound() {
  return (
    <Box sx={{
      textAlign: 'center', margin: 'auto',
    }}
    >
      <img src={noDataIcon} alt="No Data" style={{ height: '7rem' }} />
      <Typography variant="h5" sx={{ marginTop: '1rem' }}>
        No Data Found!
      </Typography>
    </Box>
  );
}

export default NoDataFound;
