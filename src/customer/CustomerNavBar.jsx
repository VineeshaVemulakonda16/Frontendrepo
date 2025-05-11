import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../customer/customer.css';
import CustomerHome from './CustomerHome';
import CustomerProfile from './CustomerProfile';
import CustomerLogin from './CustomerLogin';
import UpdateProfile from './UpdateProfile';
import { useAuth } from '../contextapi/AuthContext';
import logo from '/logo.jpg'; 
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
import BookCar from './BookCar';
import BookedCars from './BookedCars';
import ViewAllCars from './ViewAllCars';


export default function CustomerNavBar() {
  const { setIsCustomerLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsCustomerLoggedIn(false);
    sessionStorage.clear();
    navigate('/customerlogin');
  };

  const navPages = [
    { label: 'Home', path: '/customerhome' },
    { label: 'Book a Car', path: '/viewallcars' },
    { label: 'Booked Car', path: '/bookedcars' },
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
      {/* Logo on the left */}
      <Link to="/customerhome" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src={logo} alt="Logo" style={{ height: '63px', width: '60px', marginRight: '12px' }} />
      </Link>
      
      {/* Remove this line to avoid double branding */}
      {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

      <Typography
        variant="h6"
        noWrap
        component={Link}
        to="/customerhome"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.2rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
             
            </Typography>

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
                {navPages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to={page.path}
                      sx={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                    >
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
              to="/customerhome"
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
              Customer
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navPages.map((page) => (
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

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Customer" src="/static/images/avatar/3.jpg" />
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
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/customerprofile'); }}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/updateprofile'); }}>
                  <Typography textAlign="center">Update Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseUserMenu(); handleLogout(); }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path="/customerhome" element={<CustomerHome />} exact />
        <Route path="/customerprofile" element={<CustomerProfile />} exact />
        <Route path="/updateprofile" element={<UpdateProfile />} exact />
        <Route path="/viewallcars" element={<ViewAllCars />} exact />
        <Route path="/bookcar" element={<BookCar />} />
        <Route path="/bookedcars" element={<BookedCars />} exact />
        <Route path="/customerlogin" element={<CustomerLogin />} exact />
       
      </Routes>
    </div>
  );
}