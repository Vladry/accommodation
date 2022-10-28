import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Greeting from "./Greeting";
import SearchBar from "./SearchBar";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import Toolbar from '@mui/material/Toolbar';
import UserProfileMenu from "./UserProfileMenu";
import {useTheme} from "@mui/styles";
import ToggleMenuIconButton from "../ToggleMenuIconButton";


export const ToolbarMobile = ({toggleDrawer}) => {
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const isAuthenticated = useAuth(false);
    const theme = useTheme();
    console.log("theme received in ToolbarMobile: ", theme.backgroundColorDark1);

    const Toolbar_styled = styled(Toolbar)(
        {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            margin: '0 auto',
            padding: '4px 24px',
            backgroundColor: `${theme.backgroundColorDark1}`,
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            }
        }
    );

    return (

        <Toolbar_styled>

            <Typography style={{textAlign: 'center'}}>
                ДОПОМОГА УКРАЇНЦЯМ</Typography>

            {isAuthenticated && <SearchBar/>}

            <Box sx={{
                display: 'inline-flex', flexFlow: 'row nowrap', justifyContent: 'space-between',
                alignItems: 'center', width: {xs: '90%', sm: '8%', md: '20%'}
            }}>

                <ToggleMenuIconButton toggleDrawer={toggleDrawer}/>

                {!!isSmallScreen && <Greeting/>}

                <UserProfileMenu/>
            </Box>


            {!isAuthenticated &&
                <Link href={'/login'}>
                    <LoginIcon sx={{cursor: 'pointer', color: 'red'}}/>
                </Link>
            }


        </Toolbar_styled>
    );

};


