import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Login from './authentication/Login';
import NotFound from './error/NotFound';
import Callback from './authentication/Callback';
import Missions from './pages/member/Missions';
import About from './pages/common/About';
import Profile from './pages/member/Profile';
import MainLayout from './layout/MainLayout';
import AuthWrapper from './authentication/AuthWrapper';
import Welcome from './pages/guest/Welcome';

function RouterApp() {
  const routes = [
    // COMMON ROUTES
    {
      path: '/',
      element: <Landing />,
      allowedRoles: [],
    },
    {
      path: '/about',
      element: <About />,
      allowedRoles: [],
    },

    // GUEST ROUTES
    {
      path: '/login',
      element: <Login />,
      allowedRoles: [],
    },
    {
      path: '/callback',
      element: <Callback />,
      allowedRoles: [],
    },
    {
      path: '/welcome',
      element: <Welcome />,
      allowedRoles: [],
    },

    // MEMBER ROUTES
    {
      path: '/missions',
      element: <Missions />,
      allowedRoles: ['member'],
    },
    {
      path: '/profile',
      element: <Profile />,
      allowedRoles: ['member'],
    },

    // NOT FOUND ROUTE
    {
      path: '*',
      element: <NotFound />,
      allowedRoles: [],
    },
  ];

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {routes.map((route) => {
            if (route.allowedRoles.length > 0) {
              return (
                <Route
                  key={route.path}
                  element={<AuthWrapper allowedRoles={route.allowedRoles} />}
                >
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                </Route>
              );
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default RouterApp;
