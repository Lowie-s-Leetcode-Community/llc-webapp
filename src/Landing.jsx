import { React } from 'react';
import './Landing.css';
import { Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/member/Dashboard';
import { isLoggedIn } from './utils/authUtils';

function Landing() {
  const location = useLocation();
  return (
    <div className="App">
      {isLoggedIn() ? <Dashboard /> : <Navigate to="/welcome" state={{ from: location }} replace />}
    </div>
  );
}
export default Landing;
