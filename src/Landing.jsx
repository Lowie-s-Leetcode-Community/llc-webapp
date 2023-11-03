import { React } from 'react';
import './Landing.css';
import { Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function Landing() {
  // Mock login status
  const isLoggedIn = true;

  return (
    <div className="App">
      {isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
    </div>
  );
}

export default Landing;
