import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Box } from '@mui/material';
import PropTypes from 'prop-types';

function CustomGridItem({ id, itemRoute = '#', children }) {
  return (

    <Grid item xs={6} sm={4} md={3} key={id}>
      <Link to={itemRoute} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '10px',
            boxShadow: 1,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 4,
            },
            '&:active': {
              transform: 'scale(0.95)',
              boxShadow: 4,
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
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  itemRoute: PropTypes.string,
};

CustomGridItem.defaultProps = {
  itemRoute: '#',
};

export default CustomGridItem;
