import React from 'react';
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

function IconLabelValueTypography({ icon, label, value }) {
  return (
    <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
      {icon}
      <Typography variant="subtitle2">
        <span style={{ fontWeight: 'bold', marginRight: '0.363rem' }}>{label}</span>
        {value}
      </Typography>
    </Box>
  );
}

IconLabelValueTypography.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default IconLabelValueTypography;
