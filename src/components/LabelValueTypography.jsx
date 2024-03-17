import React from 'react';
import { Typography } from '@mui/material';

import PropTypes from 'prop-types';

function LabelValueTypography({ label, value }) {
  return (
    <Typography variant="subtitle2" sx={{ marginRight: '1.1rem' }}>
      <span style={{ fontWeight: 'bold', marginRight: '0.363rem' }}>{label}</span>
      {value}
    </Typography>
  );
}

LabelValueTypography.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default LabelValueTypography;
