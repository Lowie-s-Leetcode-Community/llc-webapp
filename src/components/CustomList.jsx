import React from 'react';
import {
  List, ListItem, ListItemText, useTheme, Pagination, Grid,
  Typography,
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
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5" style={{ margin: theme.spacing(2), textAlign: 'left', fontWeight: 'bold' }}>{title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" style={{ margin: theme.spacing(2), textAlign: 'right', fontWeight: 'bold' }}>
            {totalTitle}
            {': '}
            {data.length}
          </Typography>
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
    </>
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
