import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
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
import {useEffect, useState} from "react";


/*export async function getServerSideProps() {
    const res = await fetch(`https://http://localhost:3000/data`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}*/

const mediaQuery = '(max-width: 600px)';

export default function MyAppbar({toggleDrawer, data}) {

    /*** мои определения ***/
    let isMobileScreen = null;

    useEffect(() => {
        if (!!window){
            const mediaQueryList = window.matchMedia(mediaQuery);
            isMobileScreen = mediaQueryList.matches;
        }
    }, [null])

    /*** определения mui ***/
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
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
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
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
                        <MailIcon />
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
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">

                <MyToolBar>
                    <Typography>{isMobileScreen}</Typography>
                    <IconButton  onClick={toggleDrawer}>
                        {!isMobileScreen && <Typography>Dashboard</Typography>}
                        {isMobileScreen && <MenuIcon/>}
                    </IconButton>
                    <Typography style={{textAlign: 'center'}}>
                        ДОПОМОГА УКРАЇНСЬКИМ <br/> БІЖЕНЦЯМ
                    </Typography>

                    <SearchBar/>

                    <UserMenu />

                    <IconButton>
                        <ExitToAppIcon onClick={signOut}/>
                    </IconButton>
                </MyToolBar>

{/*
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>
                </Toolbar>
*/}



            </AppBar>
            {/*{renderMobileMenu}*/}
            {/*{renderMenu}*/}
        </Box>
    );
};


    const MyToolBar = styled(Toolbar)(
        ({theme})=>(
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
                    backgroundColor: theme.palette.secondary.dark
                }
            }
        ));

