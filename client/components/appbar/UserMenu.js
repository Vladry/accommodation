import React, {useEffect, useState} from 'react';
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
import {Typography} from "@mui/material";
import Greeting from "../Greeting";

const UserMenu = (props) => {
    const {menuId, mobileMenuId, handleProfileMenuOpen, handleMobileMenuOpen} = props;
    const user = useSelector(state => state.userData.user);

    return (
        <>
            {/*<Box sx={{flexGrow: 1}}/>*/}
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
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <Greeting/>

                    <AccountCircle/>

                </IconButton>
            </Box>
            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIcon/>
                </IconButton>
            </Box>

        </>
    );
};

export default UserMenu;