import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material/Button";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {signOut} from "next-auth/react";
import {useState} from "react";
import useAuth from "../hooks/useAuth";
import LoginIcon from '@mui/icons-material/Login';
import {router} from "next/client";

export default function MyAppbar({toggleDrawer}, ...props) {


    const isAuthenticated = useAuth(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };


    const accountMenuMobVerId = 'account-menu-mobile';
    const renderAccountMenuMobVer = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={accountMenuMobVerId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    const accountMenuId = 'account-menu';
    const renderAccountMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={accountMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>


            <IconButton>
                <ExitToAppIcon onClick={signOut}/>
            </IconButton>

        </Menu>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">

                <MyToolBar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        color={"primary"}
                        onClick={toggleDrawer}
                    >

                        <Typography
                            variant={"h6"}
                            noWrap
                            component={"div"}
                            sx={{display: {xs: 'none', sm: 'block'}}}
                        >Menu</Typography>

                        <MenuIcon
                            sx={{display: {xs: 'block', sm: 'none'}, mr: 2}}/>
                    </IconButton>


                    <Typography style={{textAlign: 'center'}}>
                        ДОПОМОГА УКРАЇНСЬКИМ <br/> БІЖЕНЦЯМ
                    </Typography>

                    {isAuthenticated && <SearchBar/>}

                    {isAuthenticated && <UserMenu handleProfileMenuOpen={handleProfileMenuOpen}
                                                  handleMobileMenuOpen={handleMobileMenuOpen}/>}

                    {!isAuthenticated && <IconButton
                        color={"error"}
                        onClick={() => {
                            router.push('/login');
                        }}>
                        <LoginIcon/>
                    </IconButton>}
                </MyToolBar>


            </AppBar>
            {isAuthenticated && renderAccountMenuMobVer}
            {isAuthenticated && renderAccountMenu}
        </Box>
    );
};


const MyToolBar = styled(Toolbar)(
    ({theme}) => (
        {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            margin: '0 auto',
            padding: '4px 24px',
            backgroundColor: '#502211',

            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                // backgroundColor: theme.palette.secondary.dark
            }
        }
    ));

