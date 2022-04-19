import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Menu} from "@mui/icons-material"
import {signOut} from "next-auth/react";
import NavBar from "./NavBar";
import { useMediaQuery } from 'react-responsive';
import {useTheme} from '@mui/material/styles';

const useStyles = makeStyles(() => ({

    toolbar: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: '100%',
        margin: '0 auto',

        padding: '4px 24px',
        backgroundColor: '#50A511',
        height: '80px'
    },
    navbar: {
        // width: '100%',
    }
}))

const styles = (theme) => ({
    toolbar: {
        display: "flex",

        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        },

        justifyContent: "space-around",
        alignItems: "center",
        width: '100%',
        margin: '0 auto',

        padding: '4px 24px',
        backgroundColor: '#50A511',
        height: '80px'
    },

});


const Header = () => {
    const theme = useTheme();
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dpx)' })

    return (
        <header style={{height: '80px'}}>
            <AppBar>
                <Toolbar className={classes.toolbar} >
                    <Typography>
                        ДОПОМОГА<br/>УКРАЇНСЬКИМ <br/> БІЖЕНЦЯМ
                    </Typography>
                    <NavBar classname={classes.navbar}/>
                    <Menu onClick={signOut}/>
                </Toolbar>
            </AppBar>

        </header>
    );
};

export default Header;