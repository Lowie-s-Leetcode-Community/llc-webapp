import React from 'react';
import {
  List, ListItem, useTheme, Pagination, Grid,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

function RankingNumber({ ranking }) {
  const theme = useTheme();
  let style = {};
  if (ranking === 1) {
    style = { color: 'white', backgroundColor: 'gold' };
  } else if (ranking === 2) {
    style = { color: 'white', backgroundColor: 'silver' };
  } else if (ranking === 3) {
    style = { color: 'white', backgroundColor: '#CD7F32' };
  }
  style.marginRight = theme.spacing(2);
  return (
    <Grid container alginItems="center" justifyContent="center" sx={{ flexBasis: '50px' }} style={{ borderRadius: '50%', ...style }}>
      <Typography variant="h6" style={{ margin: theme.spacing(1) }}>
        {ranking}
      </Typography>
    </Grid>
  );
}

RankingNumber.propTypes = {
  ranking: PropTypes.number.isRequired,
};

function CustomList({
  data, title = 'List', totalTitle = 'Total', paginationCount = 10, ItemDisplay, showRanking,
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
            {showRanking && <RankingNumber ranking={index + 1 + (page - 1) * paginationCount} />}
            <ItemDisplay displayData={item} />
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
  paginationCount: PropTypes.number,
  ItemDisplay: PropTypes.elementType.isRequired,
  showRanking: PropTypes.bool,
};

CustomList.defaultProps = {
  title: 'List',
  totalTitle: 'Total',
  paginationCount: 10,
  showRanking: false,
};

export default CustomList;
