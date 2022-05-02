import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import NavBar from "./NavBar";


export default function My_Drawer({isDrawerOpen, toggleDrawer}) {

    return (
        <>
            <Drawer
                anchor={'left'}
                open={isDrawerOpen}
                onClose={()=>{}}
                onClick={toggleDrawer}
            >
                {/*<Button onClick={toggleDrawer}>Close</Button>*/}
                <NavBar handleNavClick={toggleDrawer}/>
            </Drawer>
        </>
    );
}
