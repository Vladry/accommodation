import React, {useState} from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {signOut} from "next-auth/react";
import {useMediaQuery} from 'react-responsive';
import {useTheme} from '@mui/material/styles';
import {useSelector} from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import sel from "../store/selectors";
import My_Drawer from "./My_Drawer";
import Button from "@mui/material/Button";
import styled from '@emotion/styled';

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
    toolbarProps: theme.mixins.toolbar
}))


const Header = () => {
    const theme = useTheme();
    const classes = useStyles();
    const currentSection = useSelector(sel.getCurrentSection);

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isBigScreen = useMediaQuery({query: '(min-width: 1824px)'})
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
    const isPortrait = useMediaQuery({query: '(orientation: portrait)'})
    const isRetina = useMediaQuery({query: '(min-resolution: 2dpx)'})

    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => setIsOpen(!isOpen);

    const handleDrawerClose = (e)=>{
        if (e.target.name === 'drawer') {
            toggleDrawer();
        }
    };



    return (
        <MyHeader>

            <My_Drawer isOpen={isOpen} toggleDrawer={toggleDrawer}/>

            <MyAppBar toggleDrawer={toggleDrawer}>
                <MyToolBar>
                    <Button onClick={toggleDrawer}>Open Dashboard</Button>

                    <Typography style={{textAlign: 'center'}}>
                        ДОПОМОГА УКРАЇНСЬКИМ <br/> БІЖЕНЦЯМ
                    </Typography>

                    <IconButton>
                        <ExitToAppIcon onClick={signOut}/>
                    </IconButton>
                </MyToolBar>
            </MyAppBar>

        </MyHeader>
    );
};

export default Header;

const MyAppBar = styled(AppBar)`
    // min-height: 80px;
    margin: 0 auto;
    width: 100%;
    `;

const MyToolBar = styled(Toolbar)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    // margin: 0 auto;
    padding: 4px 24px;
    background-color: #50A511;
`;

const MyHeader = styled.header(
    ({theme}) => (
        {
            margin: '20px auto',

            ...theme.mixins.toolbar
        }
    )
);

