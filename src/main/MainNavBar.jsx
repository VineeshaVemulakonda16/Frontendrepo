import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './style.css';
import CustomerLogin from './../customer/CustomerLogin';
import CustomerRegistration from './../customer/CustomerRegistration';
import Contact from './Contact';
import AdminLogin from './../admin/AdminLogin';
import ManagerLogin from '../manager/ManagerLogin';
import NotFound from './NotFound';

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
import AdbIcon from '@mui/icons-material/Adb';

export default function MainNavBar() {
  const navigate = useNavigate();

  const pages = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Register', path: '/customerregistration' },
    { label: 'Contact', path: '/contact' }
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'rgb(150, 154, 157)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/managerhome" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                         <img src="/logo.jpg" alt="Logo" style={{ height: '63px', width: '60px', marginRight: '12px' }} />
           
                       </Link>
           

            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography component={Link} to={page.path} sx={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Car Renatal 
            </Typography>

            {/* Desktop Nav Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            {/* Login Dropdown */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Login options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Login" src="/static/images/avatar/1.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/customerlogin'); }}>
                  <Typography textAlign="center">Customer</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/managerlogin'); }}>
                  <Typography textAlign="center">Manager</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/adminlogin'); }}>
                  <Typography textAlign="center">Admin</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About/>} exact />
        <Route path="/customerregistration" element={<CustomerRegistration />} exact />
        <Route path="/customerlogin" element={<CustomerLogin />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="/managerlogin" element={<ManagerLogin />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </div>
  );
}