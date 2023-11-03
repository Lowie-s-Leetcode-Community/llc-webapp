import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffa116',
    },
    secondary: {
      main: '#bc5f3d',
    },
    accent: {
      main: '#e4805d',
    },
    background: {
      default: '#fff',
      card: '#f8f4f4',
    },
    text: {
      main: '#1c1122',
    },
    error: {
      main: red.A400,
    },
    gradients: {
      goldOrange: 'linear-gradient(to top, #e4805d, #ffa116)',
    },
  },
  shadows: {
    card: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  },

});

export default theme;
