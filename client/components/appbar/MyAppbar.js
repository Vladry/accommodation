import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import useAuth from "../../hooks/useAuth";
import * as propTypes from "prop-types";
import {useMediaQuery} from "@mui/material";
import {ToolbarFullSize} from "./ToolbarFullSize";
import {ToolbarMobile} from "./ToolbarMobile";

/*export async function getServerSideProps() {
    const res = await fetch(`https://http://localhost:3000/data`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}*/

function MyAppbar({toggleDrawer}) {

    const isAuthenticated = useAuth(false);
    const isMediumSize = useMediaQuery('(min-width: 601px)');
    const isSmallSize = useMediaQuery('(max-width: 600px)');

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">

                {!!isSmallSize && <ToolbarMobile toggleDrawer={toggleDrawer}/>}

                {!!isMediumSize && <ToolbarFullSize toggleDrawer={toggleDrawer}/>}

            </AppBar>

        </Box>
    );
};

export default MyAppbar;

MyAppbar.propTypes = {
    toggleDrawer: propTypes.func
};
