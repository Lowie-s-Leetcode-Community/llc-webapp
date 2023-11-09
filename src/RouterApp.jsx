import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Login from './authentication/Login';
import NotFound from './error/NotFound';
import Missions from './pages/Missions';
import About from './pages/About';
import Profile from './pages/Profile';
import Logout from './authentication/Logout';
import MainLayout from './layout/MainLayout';

function RouterApp() {
  const routes = [
    {
      path: '/login',
      element: <Login />,
      isPrivate: false,
    },
    {
      path: '/logout',
      element: <Logout />,
      isPrivate: true,
    },
    {
      path: '/',
      element: <Landing />,
      isPrivate: true,
    },
    {
      path: '/missions',
      element: <Missions />,
      isPrivate: true,
    },
    {
      path: '/about',
      element: <About />,
      isPrivate: true,
    },
    {
      path: '/profile',
      element: <Profile />,
      isPrivate: true,
    },
    {
      path: '*',
      element: <NotFound />,
      isPrivate: false,
    },
  ];

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default RouterApp;
