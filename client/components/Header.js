import React from 'react';
import {AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"

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

    return (
        <header style={{height: '80px'}}>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <Typography>
                        ДОПОМОГА<br/>УКРАЇНСЬКИМ <br/> БІЖЕНЦЯМ
                    </Typography>
                    <Menu/>
                </Toolbar>
            </AppBar>

        </header>
    );
};

export default Header;