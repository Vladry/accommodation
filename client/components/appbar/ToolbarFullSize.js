import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Greeting from "./Greeting";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import Toolbar from '@mui/material/Toolbar';


export const ToolbarFullSize = ({toggleDrawer, handleProfileMenuOpen, handleMobileMenuOpen}) => {
    const isMediumScreen = useMediaQuery('(max-width: 900px)');
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const isAuthenticated = useAuth(false);

    const Toolbar_styled = styled(Toolbar)(
        ({theme}) => (
            {
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                margin: '0 auto',
                padding: '4px 24px',
                backgroundColor: '#502211',

                [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                }
            }
        ));

    return (

        <Toolbar_styled>

            <Box sx={{
                display: 'inline-flex', flexFlow: 'row nowrap', justifyContent: 'space-between',
                alignItems: 'center', width: {xs: '90%', sm: '8%', md: '20%'}
            }}>

                <IconButton
                    size="large"
                    edge="start"
                    aria-label="open drawer"
                    color={"primary"}
                    onClick={toggleDrawer}
                >

                    <Typography
                        variant={"h6"}
                        noWrap
                        component={"div"}
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Menu</Typography>

                    <MenuIcon
                        sx={{display: {xs: 'block', sm: 'none'}, mr: 2}}/>
                </IconButton>

                {!!isSmallScreen && <Greeting/>}


                {!!isAuthenticated && !!isSmallScreen &&
                    <UserMenu handleProfileMenuOpen={handleProfileMenuOpen}
                              handleMobileMenuOpen={handleMobileMenuOpen}/>}


            </Box>
            {isSmallScreen && <Typography style={{textAlign: 'center'}}>
                ДОПОМОГА УКРАЇНЦЯМ
            </Typography>}
            {!isSmallScreen && <Typography style={{textAlign: 'center'}}>
                ДОПОМОГА<br/>УКРАЇНЦЯМ
            </Typography>}

            {isAuthenticated && <SearchBar/>}

            {!isSmallScreen && !!isMediumScreen && <Greeting/>}

            {isAuthenticated && !isSmallScreen && <UserMenu handleProfileMenuOpen={handleProfileMenuOpen}
                                                            handleMobileMenuOpen={handleMobileMenuOpen}/>}


            {!isAuthenticated &&
                <Link href={'/login'}>
                    <LoginIcon sx={{cursor: 'pointer', color: 'red'}}/>
                </Link>
            }


        </Toolbar_styled>
    );

};