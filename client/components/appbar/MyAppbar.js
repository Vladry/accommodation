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

    const isAuthenticated = useAuth(false);
    const isMediumSize = useMediaQuery('(min-width: 601px)');
    const isSmallSize = useMediaQuery('(max-width: 600px)');

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">

                {!!isSmallSize && <ToolbarMobile toggleDrawer={toggleDrawer}/>}

                {!!isMediumSize && <ToolbarFullSize toggleDrawer={toggleDrawer}/>}

            </AppBar>

        </Box>
    );
};


MyAppbar.propTypes = {
    toggleDrawer: propTypes.func
};
