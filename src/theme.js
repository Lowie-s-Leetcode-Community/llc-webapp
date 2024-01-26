import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffa116',
    },
    secondary: {
      main: '#bc5f3d',
    },
    background: {
      paper: '#f8f4f4',
      default: '#fff',
      card: '#f8f4f4',
    },
    accent: {
      main: '#e4805d',
    },
    text: {
      main: '#1c1122',
    },
    success: {
      main: '#4CAF50',
      background: '#ECFDF5',
    },
    error: {
      main: red.A400,
    },
    grey: {
      default: '#808080',
      dark: '#A9A9A9',
      text: '#4B5563',
    },
    link: {
      text: '#5D52E6',
    },
    gradients: {
      goldOrange: 'linear-gradient(to top, #e4805d, #ffa116)',
    },
  },
  customShadows: {
    light: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  },
  shape: {
    borderRadius: 4,
  },
  props: {
    MuiAppBar: {
      color: 'transparent',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
          padding: '1rem',
          borderRadius: '1rem',
        },
      },
    },
  },
  leetcodeProblem: {
    easy: {
      main: '#00AF9B',
    },
    medium: {
      main: '#FFB800',
    },
    hard: {
      main: '#FF2D55',
    },
  },

});

export default theme;
