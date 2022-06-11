import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import NavBar from "./NavBar";

export default function My_Drawer({isDrawerOpen, toggleDrawer}) {

    return (
        <>
            <SwipeableDrawer
                anchor={'left'}
                open={isDrawerOpen}
                onOpen={()=>{ }}
                onClose={toggleDrawer}
                onClick={toggleDrawer}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <NavBar/>
            </SwipeableDrawer>
        </>
    );
}
