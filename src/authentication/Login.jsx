import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Typography, Grid, Paper, Box, Link,
} from '@mui/material';
import discordLogo from '../assets/images/discord_logo_white.png';
import { isLoggedIn } from '../utils/authUtils';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  }, []);

  const serverUrl = process.env.REACT_APP_SERVER_API_URL;

  const handleLogin = () => {
    window.location.href = `${serverUrl}/api/auth/discord/login`;
  };

  const handleDevLogin = () => {
    localStorage.setItem('token', 'dev');
    window.location.href = '/';
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            Log in
          </Typography>
          <Box sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          >
            <form>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  sx={{
                    textTransform: 'none',
                    backgroundColor: '#7289DA',
                    color: '#FFFFFF',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#5B6E99',
                    },
                  }}
                >
                  <img src={discordLogo} alt="Discord Logo" style={{ height: '1rem' }} />
                  <Typography variant="body1" sx={{ marginLeft: '0.5rem' }}>
                    Log in with Discord
                  </Typography>
                </Button>
              </Box>
            </form>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Haven&rsquo;t joined our server?
                {' '}
                <Link href="https://discord.gg/qX9ABa5SEv" target="_blank" rel="noopener noreferrer">
                  Join now!
                </Link>
              </Typography>
            </Box>

            {/* TODO: Remove this on production */}
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleDevLogin}
              >
                Log in as Developer
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
