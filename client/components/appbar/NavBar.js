import React from 'react';
import {Box, Divider, MenuList, Typography, useMediaQuery} from "@mui/material";
import styled from '@emotion/styled';
import useAuth from "../../hooks/useAuth";
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import UnlockedMenu from "./UnlockedMenu";
import LockedMenu from "./LockedMenu";
import {mainMenu} from '../../public/menuConfig.js';
import {LocalMenuItem, NavLink_styled} from "../../utils/typography";


let isAuthenticated = null;

const NavBar = () => {
    isAuthenticated = useAuth(false);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const placement = `${isSmallScreen ? "top-end" : "right"}`;

    return (
        <MenuList sx={{margin: '20px'}}>
            {!isAuthenticated && <LocalMenuItem><NavLink_styled href={mainMenu[0].url}
                                                              underline={'none'}>{mainMenu[0].linkName}</NavLink_styled>
            </LocalMenuItem> }

            {!isAuthenticated && <Divider/> }

            {!isAuthenticated &&
                <Typography
                    color={"error"}
                    variant={'h6'}
                    sx={{mt: '30px'}}
                >
                    <MySpan>Login/Register</MySpan>
                    {!isAuthenticated && <Link href={'/login'}><LoginIcon
                        sx={{
                            cursor: 'pointer', color: `${({theme}) => theme.palette.error.main}`,
                            transform: 'scale(1.2) translate(10px, 6px)'
                        }}/></Link>}
                    <MySpan><br/>для активации разделов:</MySpan>
                </Typography>
            }

            <Box
                sx={{
                    ...(!isAuthenticated && {
                        border: 4,
                        borderShadow: true,
                        borderColor: 'rgba(250, 0, 0, 0.2)',
                        borderRadius: '20px',
                        mt: '30px',
                        opacity: 0.6,
                        p: 4
                    })
                }}
            >

                {isAuthenticated && <UnlockedMenu placement={placement}/>}
                {!isAuthenticated && <LockedMenu placement={placement}/>}

            </Box>

            {isAuthenticated && <LocalMenuItem><NavLink_styled href={mainMenu[0].url}
                                                                   variant={'text'}
                                           underline={'none'}>{mainMenu[0].linkName}</NavLink_styled>
            </LocalMenuItem>}



            <LocalMenuItem><NavLink_styled href={'/MyIcons'}
                                               underline={'none'}>MyIcons</NavLink_styled>
            </LocalMenuItem>
        </MenuList>
    );
};

export default NavBar;


const MySpan = styled.span`
font-size: 1em;
font-weight: 100;
color: black;
`;