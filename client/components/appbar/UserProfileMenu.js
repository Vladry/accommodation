import React, {useState} from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {signOut} from "next-auth/react";
import {useSelector} from "react-redux";
import {Avatar, Typography, useMediaQuery} from "@mui/material";
import Greeting from "./Greeting";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "../../hooks/useAuth";
import Menu from "@mui/material/Menu";
import sel from '../../store/selectors';
import Image from "next/image";

const UserProfileMenu = (props) => {
    const {menuId} = props;

    const user = useSelector(sel.user);
    const isAuthenticated = useAuth(false);
    // const isMediumScreen = useMediaQuery('(max-width: 900px)');
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
                <Box>

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
                </Box>}
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
                <Greeting />
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


                {(user && user.avatar)?
                 (   <Avatar sx={{ bgcolor: 'lightgray', color: 'darkgray',
                     width:`${isLargeScreen ? "60px" : '50px'}`,
                     height:`${isLargeScreen ? "60px" : '50px'}`
                 }}>
                        <Image src={`${user.avatar}`}
                               layout={'fill'} //если не "fill", тогда нужно указывать width и height
                            // width={50} height={50} //включить когда отключу layout строчкой выше
                               alt="candidate avatar"
                               loading="lazy" // Lazy is default IIRC
                        />
                    </Avatar>)

                :

                    <AccountCircle sx={{display: 'flex'}}/>
                    // <AccountCircle sx={{display: {xs: 'none', md: 'flex'}}}/>
                }


                {/*<MoreIcon sx={{display: {xs: 'flex', md: 'none'}}}/>*/}

            </IconButton>

            {isAuthenticated && renderUserProfileMenu}
        </>
    );
};

export default UserProfileMenu;
