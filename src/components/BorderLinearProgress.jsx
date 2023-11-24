import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(() => {
  const muiTheme = useTheme();
  return {
    height: 10,
    borderRadius: 5,
    [`&.${muiTheme.palette.mode === 'light' ? 'colorPrimary' : 'colorSecondary'}`]: {
      backgroundColor: muiTheme.palette.grey[muiTheme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${muiTheme.palette.mode === 'light' ? 'bar' : 'bar2'}`]: {
      borderRadius: 5,
      backgroundColor: muiTheme.palette.secondary.main,
    },
  };
});

export default BorderLinearProgress;
