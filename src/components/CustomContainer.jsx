import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function CustomContainer({ children }) {
  const theme = useTheme();
  return (
    <Box
      style={{
        borderRadius: 16,
        backgroundColor: theme.palette.background.card,
        boxShadow: theme.shadows.card,
      }}
      p={2}
    >
      {children}
    </Box>
  );
}

CustomContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomContainer;
