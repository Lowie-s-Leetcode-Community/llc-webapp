import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import leetcodeLogo from '../assets/images/leetcode_logo.png';
import { isLoggedIn, clearCredentials } from '../utils/authUtils';

function Header() {
  const navigate = useNavigate();
  const userLoggedIn = isLoggedIn();

  // Default navigation menu items for guest users
  let pages = ['Home', 'About'];
  let routes = ['/', '/about'];
  let settings = [];
  let settingRoutes = [];

  // Navigation menu items for logged in users (members)
  if (userLoggedIn) {
    pages = ['Dashboard', 'Missions', 'About'];
    routes = ['/', '/missions', '/about'];
    settings = ['Profile'];
    settingRoutes = ['/profile'];
  }

  // UI states for navigation menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handle logout (clear credentials from local storage)
  const handleLogout = () => {
    clearCredentials();
    navigate('/');
  };

  const username = localStorage.getItem('username');
  const avatar = localStorage.getItem('avatar');
  const discordId = localStorage.getItem('discordId');

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Large Screen Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '8px' }}>
            <Link to="/">
              <img
                src={leetcodeLogo}
                alt="LeetCode Logo"
                style={{
                  width: 'auto',
                  height: '40px',
                  maxWidth: '100%',
                }}
              />
            </Link>
          </Box>

          {/* Small Screen Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={routes[index]}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Small Screen Logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'center' }}>
            <Link to="/">
              <img
                src={leetcodeLogo}
                alt="LeetCode Logo"
                style={{
                  width: 'auto',
                  height: '40px',
                  maxWidth: '100%',
                }}
              />
            </Link>
          </Box>

          {/* Large Screen Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
                component={Link}
                to={routes[index]}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            {userLoggedIn ? (
              <>
                {/* Avatar Button */}
                <Tooltip title={username}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {avatar === null ? (
                      <Avatar alt="User Avatar">{username.charAt(0)}</Avatar>
                    ) : (
                      <Avatar src={`https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png`} alt="User Avatar" />
                    )}
                  </IconButton>
                </Tooltip>

                {/* Avatar Menu */}
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      to={settingRoutes[index]}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    key="logout"
                    onClick={handleLogout}
                  >
                    <Typography textAlign="center">Log out</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                Log in
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
