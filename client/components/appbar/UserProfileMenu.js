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
import useAuth from "../../hooks/useAuth";
import Menu from "@mui/material/Menu";

const UserProfileMenu = (props) => {
    const {menuId} = props;

    const user = useSelector(state => state.userData.user);
    const isAuthenticated = useAuth(false);
    const isMediumScreen = useMediaQuery('(max-width: 900px)');
    const isLargeScreen = useMediaQuery('(min-width: 901px)');
    const [userProfileMenuAnchorEl, setUserProfileMenuAnchorEl] = useState(null);
    const isMenuOpen = Boolean(userProfileMenuAnchorEl);
    const handleUserProfileMenuOpen = (event) => {
        setUserProfileMenuAnchorEl(event.currentTarget);
    };
    const handleUserProfileMenuClose = () => {
        setUserProfileMenuAnchorEl(null);
    };

    const userProfileMenuId = 'account-menu';
    const renderUserProfileMenu = (
        <Menu
            anchorEl={userProfileMenuAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={userProfileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleUserProfileMenuClose}
        >

            {!isLargeScreen &&
                <>
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
                </>}

                    <MenuItem><Typography>logged: {user?.email}</Typography></MenuItem>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>My account</MenuItem>
                    <MenuItem>
                        <IconButton onClick={signOut}>
                        <ExitToAppIcon/>
                    </IconButton>
                    </MenuItem>
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
                onClick={handleUserProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle sx={{display: {xs: 'none', md: 'flex'}}}/>
                <MoreIcon sx={{display: {xs: 'flex', md: 'none'}}}/>

            </IconButton>

            {isAuthenticated && renderUserProfileMenu}
        </>
    );
};

export default UserProfileMenu;