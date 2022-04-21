import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Menu} from "@mui/icons-material"
import {signOut} from "next-auth/react";
import NavBar from "./NavBar";
import {useMediaQuery} from 'react-responsive';
import {useTheme} from '@mui/material/styles';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import sel from "../store/selectors";

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


const useStyles = makeStyles((theme) => ({
    appbar: {minHeight: '80px'},
    toolbar: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: '100%',
        margin: '0 auto',

        padding: '4px 24px',
        backgroundColor: '#50A511',

    },
    navbar: {
        //
    },
    toolbarProps: theme.mixins.toolbar
}))


const Header = () => {
    const theme = useTheme();
    const classes = useStyles();
    const router = useRouter();
    const currentSection = useSelector(sel.getCurrentSection);


    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
    const isPortrait = useMediaQuery({query: '(orientation: portrait)'})
    const isRetina = useMediaQuery({query: '(min-resolution: 2dpx)'})

    return (
        <header style={{marginTop: '20px'}} className={classes.toolbarProps}>
            <AppBar className={classes.appbar}>
                <Toolbar className={classes.toolbar}>

                        <NavBar classname={classes.navbar}/>


                    <Typography>
                        ДОПОМОГА<br/>УКРАЇНСЬКИМ <br/> БІЖЕНЦЯМ
                    </Typography>
                    <Typography>
                        Текущий путь: {router.pathname} <br/>
                        Текущий раздел: {currentSection}
                    </Typography>
                    <IconButton>
                        <ExitToAppIcon onClick={signOut}/>
                    </IconButton>
                </Toolbar>
            </AppBar>

        </header>
    );
};

export default Header;