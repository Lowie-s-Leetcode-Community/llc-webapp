import React from 'react';
import { Card, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

export function CustomCard({ type, children, sx }) {
  const theme = useTheme();
  const isGold = type === 'gold';
  return ((isGold) ? <GoldCard theme={theme} sx={sx}>{children}</GoldCard>
    : <NormalCard theme={theme} sx={sx}>{children}</NormalCard>);
}

CustomCard.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  sx: PropTypes.instanceOf(Object),
};

CustomCard.defaultProps = {
  sx: {},
};

export function GoldCard({ children, theme, sx }) {
  const goldOrangeBackground = {
    backgroundImage: theme.palette.gradients.goldOrange,
    color: '#fff',
  };

  const cardStyle = {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.customShadows.light,
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <Card sx={{ ...cardStyle, ...goldOrangeBackground, ...sx }}>
      {children}
    </Card>
  );
}

export function NormalCard({ children, theme, sx }) {
  const normalBackground = {
    backgroundColor: theme.palette.background.card,
  };

  const cardStyle = {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.customShadows.light,
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <Card sx={{ ...cardStyle, ...normalBackground, ...sx }}>
      { children }
    </Card>
  );
}

GoldCard.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
  sx: PropTypes.instanceOf(Object),
};

NormalCard.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
  sx: PropTypes.instanceOf(Object),
};

GoldCard.defaultProps = {
  sx: {},
};

NormalCard.defaultProps = {
  sx: {},
};
