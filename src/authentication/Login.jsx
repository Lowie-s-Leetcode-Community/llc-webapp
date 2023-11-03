import { React, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button, TextField, Typography, Grid, Paper, Box,
} from '@mui/material';

function Login() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
  };

  async function getMessage() {
    const result = await fetch('/api/message');
    const json = await result.json();

    setMessage(json);
  }

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <>
      {/* message here is just to avoid ESLint warning */}
      {message}
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={6} sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
              Welcome to
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: '500' }}>
              Lowie&apos;s LeetCode Community!
            </Typography>
            <Box sx={{ mt: 3 }}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Log In
                  </Button>
                </Box>
              </form>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Don&rsquo;t have an account?
                  {' '}
                  <RouterLink to="/signup">Sign Up</RouterLink>
                </Typography>
              </Box>

              {/* TODO: Remove this when login status check is done */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  <RouterLink to="/">Dev Only: Home</RouterLink>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
