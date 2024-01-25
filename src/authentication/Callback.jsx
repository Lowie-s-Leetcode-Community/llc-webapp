import { React, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCredentials, isLoggedIn } from '../utils/authUtils';

function Callback() {
  const [searchParams] = useSearchParams(window.location.search);
  const code = searchParams.get('code');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (code !== null) {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_API_URL}/api/auth/discord/callback`, { code });
        clearCredentials();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user_id);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('avatar', response.data.avatar);
        localStorage.setItem('discordId', response.data.discord_id);
        if (isLoggedIn()) {
          navigate('/');
        }
      }
    };
    fetchData();
  }, [code, navigate]);
  return (
    <div />
  );
}

export default Callback;
