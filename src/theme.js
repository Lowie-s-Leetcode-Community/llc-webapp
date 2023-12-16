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
});

export default theme;
