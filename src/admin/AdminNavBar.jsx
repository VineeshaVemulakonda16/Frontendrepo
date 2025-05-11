import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../admin/admin.css';
import AdminHome from '../admin/AdminHome';
import AddManager from '../admin/AddManager';
import ViewManagers from '../admin/ViewManagers';
import ViewCustomers from '../admin/ViewCustomers';
import AdminLogin from '../admin/AdminLogin';
import { useAuth } from '../contextapi/AuthContext';

import DisplayCars from '../admin/DisplayCar';
import ViewAllCars from '../admin/ViewAllCars';
import Deals from '../admin/Deals'; 


// MUI imports
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
import DealsDetails from './DealDetails';

export default function AdminNavBar() {
  const { setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    navigate('/adminlogin');
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElView, setAnchorElView] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleOpenViewMenu = (event) => setAnchorElView(event.currentTarget);
  const handleCloseViewMenu = () => setAnchorElView(null);
  const [customerCount, setCustomerCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
 
  
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const customerRes = await axios.get(`${config.url}/admin/customercount`);
        const managerRes = await axios.get(`${config.url}/admin/managercount`);
      
  
        setCustomerCount(customerRes.data);
        setManagerCount(managerRes.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
  
    fetchCounts();
  }, []);
  
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'rgb(150, 154, 157)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
             <Link to="/managerhome" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                          <img src="/logo.jpg" alt="Logo" style={{ height: '63px', width: '60px', marginRight: '12px' }} />
                        </Link>
            

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <MenuItem component={Link} to="/adminhome" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={handleOpenViewMenu}>View</MenuItem>
                <MenuItem component={Link} to="/deals" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Deals</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/adminhome"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ADMIN
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button component={Link} to="/adminhome" sx={{ my: 2, color: 'white' }}>
                Home
              </Button>
              <Button component={Link} to="/addeventmanager" sx={{ my: 2, color: 'white' }}>
  Add Rental Manager
</Button>

              <Button
                sx={{ my: 2, color: 'white' }}
                onClick={handleOpenViewMenu}
              >
                View
              </Button>
              <Menu
                anchorEl={anchorElView}
                open={Boolean(anchorElView)}
                onClose={handleCloseViewMenu}
              >
                <MenuItem component={Link} to="/displaycars" onClick={handleCloseViewMenu}>
                  Display Cars
                </MenuItem>
                <MenuItem component={Link} to="/viewallcars" onClick={handleCloseViewMenu}>
                  View All Cars
                </MenuItem>
                <MenuItem component={Link} to="/viewallcustomers" onClick={handleCloseViewMenu}>
                  View All Customers
                </MenuItem>
                <MenuItem component={Link} to="/viewmanagers" onClick={handleCloseViewMenu}>
                  View Rental Managers
                </MenuItem>
              </Menu>

              <Button component={Link} to="/deals" sx={{ my: 2, color: 'white' }}>
                Deals
              </Button>
            </Box>
         

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
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

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/addeventmanager" element={<AddManager />} exact />
        <Route path="/viewmanagers" element={<ViewManagers />} exact />
        <Route path="/viewallcustomers" element={<ViewCustomers />} exact />
        <Route path="/viewallcars" element={<ViewAllCars />} exact />
        <Route path="/displaycars" element={<DisplayCars />} exact />
        <Route path="/adminlogin" element={<AdminLogin />} exact />
        <Route path="/deals" element={<Deals />} exact />
        <Route path="/dealsdetails" element={<DealsDetails />} exact />
        <Route path="/deal/:id" element={<DealsDetails />} />
      </Routes>
    </div>
  );
}