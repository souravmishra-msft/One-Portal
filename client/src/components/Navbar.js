import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Api as ApiIcon, Favorite as FavoriteIcon, GitHub, Home as HomeIcon, Info, Logout, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, styled, Tab, Tabs, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/PortalLogo.png';
import About from './About';
import Favorites from './Favorites';
import Home from './Home';
import LeftDrawer from './LeftDrawer';


const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
});


const LogoBox = styled(Box)(({ theme }) => ({
    display: 'none',
    gap: '10px',
    alignItems: 'center',
    // If more than sm the display else block
    [theme.breakpoints.up('sm')]: {
        display: 'flex'
    }
}));

const TabsBox = styled(Box)(({ theme }) => ({
    display: 'none',
    gap: '10px',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        display: 'flex'
    }
}));


const UserBox = styled(Box)(({ theme }) => ({
    display: 'none',
    gap: '10px',
    alignItems: 'center',
    //hide if sm or bigger than sm
    [theme.breakpoints.up('sm')]: {
        display: 'flex'
    }
}));

const navPages = ['Favorites', 'About'];


const Navbar = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [name, setName] = useState(null);
    // const open = Boolean(anchorEl);

    const { instance } = useMsal();

    useEffect(() => {
        const account = instance.getActiveAccount();
        // console.log(account);
        setName(account.name);
    }, [instance]);

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = (instance) => {
        console.log(instance);
        instance.logoutRedirect().catch(e => console.error(e));
    }

    return (
        <AppBar position='static' sx={{ bgcolor: '#063970' }}>
            <StyledToolbar>
                <LogoBox>
                    <ApiIcon />
                    <Typography component={Link} to={'/'} sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>One Portal</Typography>
                </LogoBox>
                <ApiIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
                <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-evenly', gap: 1, alignItems: 'center' }}>
                    <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }} color='inherit'>
                        <MenuIcon />
                    </IconButton>
                </Box>



                {/* Display the Avatar when size is more than sm. Also display the usermenu. */}
                <AuthenticatedTemplate>
                    <UserBox >
                        {/* Main Navigation Bar on the Navbar */}
                        <TabsBox>
                            <Button onClick={handleCloseNavMenu} startIcon={<HomeIcon />} sx={{ my: 2, color: '#ffff', display: 'flex' }}>
                                <Link style={{ textDecoration: 'none', color: '#ffff' }} to={`/`}>Home</Link>
                            </Button>
                            <Button onClick={handleCloseNavMenu} startIcon={<FavoriteIcon />} sx={{ my: 2, color: '#ffff', display: 'flex' }}>
                                <Link style={{ textDecoration: 'none', color: '#ffff' }} to={`/favorites`}>Favorites</Link>
                            </Button>
                            <Button onClick={handleCloseNavMenu} startIcon={<Info />} sx={{ my: 2, color: '#ffff', display: 'flex' }}>
                                <Link style={{ textDecoration: 'none', color: '#ffff' }} to={`/about`}>About</Link>
                            </Button>
                        </TabsBox>
                        <Tooltip title='Open Settings'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ cursor: 'pointer' }} src='https://e7.pngegg.com/pngimages/78/788/png-clipart-computer-icons-avatar-business-computer-software-user-avatar-child-face.png' />
                            </IconButton>
                        </Tooltip>
                    </UserBox>
                </AuthenticatedTemplate>

            </StyledToolbar>


            {/* User Menu Items anchorEl={anchorElUser}*/}
            <Menu
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'bottom',
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
                {/* <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" component={Link} to={'/profile'} sx={{ textDecoration: 'none', color: '#141414' }}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" component={Link} to={'/account'} sx={{ textDecoration: 'none', color: '#141414' }}>Account</Typography>
                </MenuItem> */}
                <MenuItem onClick={handleCloseUserMenu}>
                    <Button variant='text' onClick={() => handleLogout(instance)} sx={{ textDecoration: 'none', color: '#141414', textTransform: 'none', display: 'flex', gap: 1 }}><Logout /> Logout</Button>
                </MenuItem>
            </Menu>

            {/* MenuIcon menu items anchorEl={anchorElNav} */}
            <Menu
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
                <MenuItem>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar sx={{ width: 30, height: 30, cursor: 'pointer' }} src='https://e7.pngegg.com/pngimages/78/788/png-clipart-computer-icons-avatar-business-computer-software-user-avatar-child-face.png' />
                        <Typography variant='h6' ml={2} noWrap>{name}</Typography>
                    </IconButton>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" component={Link} to={`/`} sx={{ textDecoration: 'none', color: '#141414', display: 'flex', gap: 1 }}><HomeIcon /> Home</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" component={Link} to={`/favorites`} sx={{ textDecoration: 'none', color: '#141414', display: 'flex', gap: 1 }}><FavoriteIcon /> Favorites</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" component={Link} to={`/about`} sx={{ textDecoration: 'none', color: '#141414', display: 'flex', gap: 1 }}><Info /> About</Typography>
                </MenuItem>
                <Divider />
                {/* <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" component={Link} to={'/profile'} sx={{ textDecoration: 'none', color: '#141414' }}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" component={Link} to={'/account'} sx={{ textDecoration: 'none', color: '#141414' }}>Account</Typography>
                </MenuItem> */}
                <MenuItem onClick={handleCloseUserMenu}>
                    <Button variant='text' onClick={() => handleLogout(instance)} sx={{ textDecoration: 'none', color: '#141414', textTransform: 'none', display: 'flex', gap: 1 }}><Logout /> Logout</Button>
                </MenuItem>
            </Menu>
        </AppBar>

    )
}

export default Navbar

