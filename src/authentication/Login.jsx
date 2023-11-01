import { React, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button, TextField, Typography, Grid,
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
    <div className="App">
      <header className="App-header">
        <p>{message.message}</p>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Log In
          </Button>
        </form>
        <RouterLink to="/">Home</RouterLink>
      </header>
    </div>
  );
}

export default Login;
