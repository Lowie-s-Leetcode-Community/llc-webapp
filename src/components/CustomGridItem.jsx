import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Box } from '@mui/material';
import PropTypes from 'prop-types';

function CustomGridItem({ itemKey = 'key', itemRoute = '#', children }) {
  return (

    <Grid item xs={6} sm={4} md={3} key={itemKey}>
      <Link to={itemRoute} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
            },
            '&:active': {
              transform: 'scale(0.95)',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
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
              padding: '10px',
            }}
          >
            {children}
          </Box>
        </Card>
      </Link>
    </Grid>
  );
}

CustomGridItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  itemRoute: PropTypes.string,
};

CustomGridItem.defaultProps = {
  itemRoute: '#',
};

export default CustomGridItem;
