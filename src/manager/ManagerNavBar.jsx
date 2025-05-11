import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../manager/manager.css';
import ManagerHome from './ManagerHome';
import ManagerProfile from './ManagerProfile';
import ManagerLogin from './ManagerLogin';

import AddCar from './AddCar';
import ViewBookings from './ViewBookings';
import { useAuth } from '../contextapi/AuthContext';

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
import Deals from './Deals';
import DealsDetails from './DealsDetails';
import UpdateCarDetails from './UpdateCarDetails';
import UpdateProfile from './UpdateProfile';

export default function ManagerNavBar() {
  const { setIsManagerLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsManagerLoggedIn(false);
    sessionStorage.clear();
    navigate('/managerlogin');
  };

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
            {/* Logo added here */}
             {/* Desktop Logo */}
             <Link to="/managerhome" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src="/logo.jpg" alt="Logo" style={{ height: '63px', width: '60px', marginRight: '12px' }} />

            </Link>

            
            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem component={Link} to="/managerhome" onClick={handleCloseNavMenu}>Home</MenuItem>
                <MenuItem component={Link} to="/addevent" onClick={handleCloseNavMenu}>Add New Event</MenuItem>
                <MenuItem component={Link} to="/addcar" onClick={handleCloseNavMenu}>Add New Car</MenuItem>
                <MenuItem component={Link} to="/viewbookings" onClick={handleCloseNavMenu}>View Bookings</MenuItem>
                <MenuItem component={Link} to="/deals" onClick={handleCloseNavMenu}>Deals</MenuItem>
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            
            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button component={Link} to="/managerhome" sx={{ my: 2, color: 'white', display: 'block' }}>
                Home
              </Button>
              <Button component={Link} to="/viewbookings" sx={{ my: 2, color: 'white', display: 'block' }}>
                View Bookings
              </Button>
              <Button component={Link} to="/deals" sx={{ my: 2, color: 'white', display: 'block' }}>
                Deals
              </Button>
            </Box>

            {/* Avatar */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Manager" src="avatar.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => {
                  handleCloseUserMenu();
                  navigate('/managerprofile');
                }}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleCloseUserMenu();
                  navigate('/UpdateProfile');
                }}>
                  <Typography textAlign="center">Update Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Manager Routes */}
      <Routes>
        <Route path="/managerhome" element={<ManagerHome />} />
        <Route path="/managerprofile" element={<ManagerProfile />} />
        <Route path="/managerlogin" element={<ManagerLogin />} />
      
        <Route path="/addcar" element={<AddCar />} />
   
        <Route path="/viewbookings" element={<ViewBookings />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/deal/:id" element={<DealsDetails />} />
        <Route path="/update-car/:id" element={<UpdateCarDetails />} />
        <Route path="/UpdateProfile" element={<UpdateProfile/>} exact />
      </Routes>
    </div>
  );
}