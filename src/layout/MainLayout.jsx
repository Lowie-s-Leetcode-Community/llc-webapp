import React from 'react';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

function MainLayout({ children }) {
  const location = useLocation();
  const HIDE_HEADER_FOOTER_PATHS = [];
  const hideHeaderFooter = HIDE_HEADER_FOOTER_PATHS.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Container maxWidth="xl">
        {children}
      </Container>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
