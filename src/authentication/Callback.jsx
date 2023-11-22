import { React, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Callback() {
  const [searchParams] = useSearchParams(window.location.search);
  const code = searchParams.get('code');
  const navigate = useNavigate();
  useEffect(() => async () => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_API_URL}/auth/discord/callback`, { code });
    localStorage.setItem('token', response.data.token);
    navigate('/');
  }, []);
  return (
    <div />
  );
}

export default Callback;
