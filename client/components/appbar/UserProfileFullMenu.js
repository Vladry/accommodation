import React, {forwardRef, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {signOut} from "next-auth/react";
import {useSelector} from "react-redux";
import {getProfile} from "../../store/actions/userAction";
import {Typography, useMediaQuery} from "@mui/material";
import Greeting from "./Greeting";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useAuth from "../../hooks/useAuth";

const UserProfileFullMenu = (props) => {
    const {menuId} = props;

    const user = useSelector(state => state.userData.user);
    const isAuthenticated = useAuth(false);
    const [userProfileFullMenuAnchorEl, setUserProfileFullMenuAnchorEl] = useState(null);
    const isFullMenuOpen = Boolean(userProfileFullMenuAnchorEl);

    const handleUserProfileFullMenuOpen = (event) => {
        setUserProfileFullMenuAnchorEl(event.currentTarget);
    };
    const handleUserProfileFullMenuClose = () => {
        setUserProfileFullMenuAnchorEl(null);
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
                open={isFullMenuOpen}
                onClose={handleUserProfileFullMenuClose}
            >
                {isLargeScreen &&
                    <Box>
                        <MenuItem><Typography>logged: {user?.email}</Typography></MenuItem>
                        <MenuItem onClick={handleUserProfileFullMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleUserProfileFullMenuClose}>My account</MenuItem>
                    </Box>}

                <IconButton onClick={signOut}>
                    <ExitToAppIcon/>
                </IconButton>
            </Menu>
        );


    return (
        <>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>

                <Greeting/>
            </Box>

                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleUserProfileFullMenuOpen}
                    color="inherit"
                >
                    <AccountCircle  sx={{display: {xs: 'none', md: 'flex'}}}/>
                    <MoreIcon  sx={{display: {xs: 'flex', md: 'none'}}}/>

                </IconButton>



            {isAuthenticated && renderUserProfileFullMenu}
        </>
    );
};

export default UserProfileFullMenu;