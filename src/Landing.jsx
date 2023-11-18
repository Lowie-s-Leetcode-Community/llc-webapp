import { React, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import logo from './logo.svg';
import './Landing.css';

function Landing() {
  const [message, setMessage] = useState('');

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
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message.message}</p>
        <RouterLink to="/login">Login by Discord</RouterLink>
      </header>
    </div>
  );
}
export default Landing;
