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

const UserProfileMobMenu = (props) => {
    const {menuId} = props;

    const user = useSelector(state => state.userData.user);
    const isAuthenticated = useAuth(false);
    const [userProfileMobMenuAnchorEl, setUserProfileMobMenuAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(userProfileMobMenuAnchorEl);
    const handleUserProfileMobMenuOpen = (event) => {
        setUserProfileMobMenuAnchorEl(event.currentTarget);
    };
    const handleUserProfileMobMenuClose = () => {
        setUserProfileMobMenuAnchorEl(null);
    };

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

            <MenuItem>

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
                onClick={handleUserProfileMobMenuOpen}
                color="inherit"
            >
                <AccountCircle sx={{display: {xs: 'none', md: 'flex'}}}/>
                <MoreIcon sx={{display: {xs: 'flex', md: 'none'}}}/>

            </IconButton>

            {isAuthenticated && renderUserProfileMobMenu}
        </>
    );
};

export default UserProfileMobMenu;