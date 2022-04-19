import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Menu} from "@mui/icons-material"
import useAuth from "../hooks/useAuth";
import {signOut} from "next-auth/react";
import NavBar from "./NavBar";

const useStyles = makeStyles(() => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',

        padding: '4px 24px',
        backgroundColor: '#50A5F1',
        height: '80px'
    }
}))

const Header = () => {
    const classes = useStyles();
    const isAuthenticated = useAuth(false);
    //
    // if (!isAuthenticated) return <></>;

    return (
        <header style={{height: '80px'}}>
            <AppBar>
                <Toolbar className={'classes.toolbar'}>
                    <Typography>
                        ДОПОМОГА<br/>УКРАЇНСЬКИМ <br/> БІЖЕНЦЯМ
                    </Typography>
                    <NavBar/>
                    <Menu onClick={signOut}/>
                </Toolbar>
            </AppBar>

        </header>
    );
};

export default Header;