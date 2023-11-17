import React from 'react';
import {
  List, ListItem, ListItemText, useTheme, Pagination, Card, Grid,
} from '@mui/material';
import PropTypes from 'prop-types';

function CustomList({
  data, title = 'List', totalTitle = 'Total', primaryData, secondaryData, secondaryTitle = '', paginationCount = 10,
}) {
  const theme = useTheme();

  // Pagination
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  return (
    <Card sx={{
      borderRadius: theme.shape.borderRadius, boxShadow: theme.customShadows.light, padding: theme.spacing(2), textAlign: 'center', backgroundColor: theme.palette.background.card, marginTop: theme.spacing(2),
    }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h4 style={{ margin: theme.spacing(2), textAlign: 'left' }}>{title}</h4>
        </Grid>
        <Grid item>
          <h4 style={{ margin: theme.spacing(2), textAlign: 'right' }}>
            {totalTitle}
            {': '}
            {data.length}
          </h4>
        </Grid>
      </Grid>
      <List>
        {data.slice((page - 1) * paginationCount, page * paginationCount).map((item, index) => (
          <ListItem
            key={item.id}
            sx={{
              borderRadius: theme.shape.borderRadius,
              backgroundColor: index % 2 === 0 ? theme.palette.grey[200]
                : 'transparent',
              margin: theme.spacing(1),
            }}
          >
            <ListItemText primary={item[primaryData]} secondary={`${secondaryTitle} ${item[secondaryData]}`} />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={Math.ceil(data.length / paginationCount)}
        page={page}
        onChange={handleChangePage}
      />
    </Card>
  );
}

CustomList.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string,
  totalTitle: PropTypes.string,
  primaryData: PropTypes.string.isRequired,
  secondaryData: PropTypes.string.isRequired,
  secondaryTitle: PropTypes.string,
  paginationCount: PropTypes.number,
};

CustomList.defaultProps = {
  title: 'List',
  totalTitle: 'Total',
  paginationCount: 10,
  secondaryTitle: '',
};

export default CustomList;
