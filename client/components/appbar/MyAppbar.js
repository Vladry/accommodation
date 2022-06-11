import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {signOut} from "next-auth/react";
import {useRef, useState} from "react";
import useAuth from "../../hooks/useAuth";
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import {NavLink} from "./NavLink";
import IconLink from "./IconLink";
import {useSelector} from "react-redux";
import Greeting from "./Greeting";
import * as propTypes from "prop-types";
import {useMediaQuery} from "@mui/material";
import {ToolbarFullSize} from "./ToolbarFullSize";
import {ToolbarMobile} from "./ToolbarMobile";
import BasicMenuTest from "../../pages/BasicMenuTest";

/*export async function getServerSideProps() {
    const res = await fetch(`https://http://localhost:3000/data`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}*/

export default function MyAppbar({toggleDrawer}) {
    const refPicker = useRef();
    const user = useSelector(state => state.userData.user);
    const isAuthenticated = useAuth(false);
    const [userProfileFullMenuAnchorEl, setUserProfileFullMenuAnchorEl] = useState(null);
    const [userProfileMobMenuAnchorEl, setUserProfileMobMenuAnchorEl] = useState(null);

    const isMenuOpen = Boolean(userProfileFullMenuAnchorEl);
    const isMobileMenuOpen = Boolean(userProfileMobMenuAnchorEl);
    const isMediumSize = useMediaQuery('(min-width: 601px)');
    const isSmallSize = useMediaQuery('(max-width: 600px)');


    const handleUserProfileFullMenuOpen = (event) => {
        // console.log('in handle userProfileFullMenu Open');
        console.log('event.currentTarget in MyAppbar: ', event.currentTarget);
        console.log('refPicker.current in MyAppbar: ', refPicker.current);
        // setUserProfileFullMenuAnchorEl(event.currentTarget);
        setUserProfileFullMenuAnchorEl(refPicker.current);
    };
    const handleUserProfileMobMenuOpen = (event) => {
        // console.log('in handleMobileMenuOpen');
        console.log('refPicker.current in MyAppbar: ', refPicker.current);
        // setUserProfileMobMenuAnchorEl(event.currentTarget);
        setUserProfileMobMenuAnchorEl(refPicker.current);
    };


    const handleUserProfileFullMenuClose = () => {
        setUserProfileFullMenuAnchorEl(null);
        handleUserProfileMobMenuClose();
    };
    const handleUserProfileMobMenuClose = () => {
        setUserProfileMobMenuAnchorEl(null);
    };



    const accountMenuId = 'account-menu';
    const renderUserProfileFullMenu = (
        <Menu
            anchorEl={userProfileFullMenuAnchorEl}
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
            onClose={handleUserProfileFullMenuClose}
        >
            <MenuItem><Typography>logged: {user?.email}</Typography></MenuItem>
            <MenuItem onClick={handleUserProfileFullMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserProfileFullMenuClose}>My account</MenuItem>

            <IconButton onClick={signOut}>
                <ExitToAppIcon/>
            </IconButton>
        </Menu>
    );


    const userProfileMobMenuId = 'account-menu-mobile';
    const renderUserProfileMobMenu = (
        <Menu
            anchorEl={userProfileMobMenuAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={userProfileMobMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleUserProfileMobMenuClose}
        >

            <MenuItem><Typography>logged: {user?.email}</Typography></MenuItem>


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

            <MenuItem onClick={handleUserProfileFullMenuOpen}>

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



    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">

                {!!isSmallSize && <ToolbarMobile toggleDrawer={toggleDrawer}
                                                 ref={refPicker}
                                                 handleUserProfileMobMenuOpen={handleUserProfileMobMenuOpen}
                />}

                {!!isMediumSize && <ToolbarFullSize toggleDrawer={toggleDrawer}
                                                    ref={refPicker}
                                                    handleUserProfileFullMenuOpen={handleUserProfileFullMenuOpen}
                />}


            </AppBar>
            {isAuthenticated && renderUserProfileMobMenu}
            {isAuthenticated && renderUserProfileFullMenu}
        </Box>
    );
};


MyAppbar.propTypes = {
    toggleDrawer: propTypes.func
};
