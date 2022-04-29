import React from 'react';
import {Box, Divider, MenuList, Typography, useMediaQuery} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import {NavLink} from "./NavLink";
import styled from '@emotion/styled';
import useAuth from "../hooks/useAuth";
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import UnlockedMenu from "./UnlockedMenu";
import LockedMenu from "./LockedMenu";
import menuConfig from '../public/menuConfig.js';

let isAuthenticated = null;

const NavBar = () => {
    isAuthenticated = useAuth(false);
    const isSmallScreen = useMediaQuery('(min-width: 600px)');
    const placement = `${isSmallScreen ? "right" : "top-end"}`;

    return (
        <MenuList sx={{margin: '20px'}}>

            <Box>placement: {placement}</Box>

            <MenuItem><NavLinkUnprotected href={menuConfig[0].url}
                                          underline={'none'}>{menuConfig[0].linkName}</NavLinkUnprotected></MenuItem>

            {!isAuthenticated && <Divider/>}

            {!isAuthenticated &&
                <Typography
                    color={"error"}
                    variant={'h6'}
                    sx={{mt: '30px'}}
                >
                    <MySpan>Login/Register</MySpan>
                    {/*{!isAuthenticated && <Link href={'/login'}>Login/Register</Link>}*/}
                    {!isAuthenticated && <Link href={'/login'}><LoginIcon
                        sx={{cursor: 'pointer', color: `${({theme}) => theme.palette.error.main}`}}/></Link>}
                    <MySpan><br/>для активации разделов:</MySpan>
                </Typography>
            }

            <Box
                sx={{
                    ...(!isAuthenticated && {
                        border: 2,
                        borderColor: 'rgba(250, 0, 0, 0.6)',
                        borderRadius: '20px',
                        mt: '30px',
                        opacity: 0.6,
                        p: 20
                    })
                }}
            >
                {isAuthenticated && <UnlockedMenu placement={placement}/>}
                {!isAuthenticated && <LockedMenu placement={placement}/>}

            </Box>
        </MenuList>
    );
};

export default NavBar;


const NavLinkUnprotected = styled(NavLink)`
margin: 5px 10px;
text-decoration: none;
&:visited, &:link, &:active {color: ${props => props.theme.palette.primary.main}   };
&:focus, &:hover {color: ${props => props.theme.palette.warning.dark} };
`;


const MenuItem = styled.div`
border: 2px solid #ccc;
border-radius: 15px;
margin: 20px 10px;
`;

const MySpan = styled.span`
font-size: 1em;
font-weight: 100;
color: black;
`;