import React, {useState} from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {signOut} from "next-auth/react";
import {useMediaQuery} from 'react-responsive';
import {useTheme} from '@mui/material/styles';
import {useSelector} from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import sel from "../store/selectors";
import My_Drawer from "./My_Drawer";
import Button from "@mui/material/Button";
import styled from '@emotion/styled';
import {styled as _styled, alpha} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import MyAppbar from "./MyAppbar";

const Header = () => {


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);


    return (
        <MyHeader>

            <My_Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
            <MyAppbar toggleDrawer={toggleDrawer}/>

        </MyHeader>
    );
};

export default Header;



const MyHeader = styled.header(
    ({theme}) => (
        {
            margin: '20px auto',
            ...theme.mixins.toolbar
        }
    )
);

