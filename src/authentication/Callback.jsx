import { React, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isLoggedIn } from '../utils/authUtils';

function Callback() {
  const [searchParams] = useSearchParams(window.location.search);
  const code = searchParams.get('code');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (code !== null) {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_API_URL}/api/auth/discord/callback`, { code });
        localStorage.clear();
        localStorage.setItem('token', response.data.token);

        // TODO: Implement roles
        // localStorage.setItem('roles', response.data.roles);

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
