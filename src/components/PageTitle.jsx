import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, useTheme } from '@mui/material';

import PropTypes from 'prop-types';

/**
 * Renders a page title with an optional username.
 *
 * @component
 * @param {boolean} includeUsername - Whether to include the username in the title (default: false).
 * @param {string} title - The title to be displayed.
 * @returns {JSX.Element} The rendered page title component.
  *
 * @example
 * <PageTitle title="dashboard" includeUsername/> => "<username>'s dashboard"
 * <PageTitle title="About us" /> => "About us"
 */

function PageTitle({ includeUsername, title }) {
  const theme = useTheme();
  const username = localStorage.getItem('username');
  return (
    <Typography variant="h6" marginBottom="1rem" marginTop="1rem">
      <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography
          variant="h6"
          color="primary"
          sx={{
            display: 'inline',
            '&:hover': {
              color: theme.palette.secondary.main,
            },
          }}
        >
          {includeUsername && username}
        </Typography>
      </Link>
      {includeUsername && "'s "}
      {title}
    </Typography>
  );
}

PageTitle.propTypes = {
  includeUsername: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

PageTitle.defaultProps = {
  includeUsername: false,
};

export default PageTitle;
