import React from 'react';
import { Card, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

export function CustomCard({ type, children }) {
  const theme = useTheme();
  const isGold = type === 'gold';
  return ((isGold) ? <GoldCard theme={theme}>{children}</GoldCard>
    : <NormalCard theme={theme}>{children}</NormalCard>);
}

CustomCard.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export function GoldCard({ children, theme }) {
  const goldOrangeBackground = {
    backgroundImage: theme.palette.gradients.goldOrange,
    color: '#fff',
  };

  const cardStyle = {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.customShadows.light,
    padding: theme.spacing(2),
    textAlign: 'center',
  };
  return (
    <Card sx={{ ...cardStyle, ...goldOrangeBackground }}>
      {children}
    </Card>
  );
}

export function NormalCard({ children, theme }) {
  const normalBackground = {
    backgroundColor: theme.palette.background.card,
  };

  const cardStyle = {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.customShadows.light,
    padding: theme.spacing(2),
    textAlign: 'center',
  };
  return (
    <Card sx={{ ...cardStyle, ...normalBackground }}>
      { children }
    </Card>
  );
}

GoldCard.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
};

NormalCard.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
};
