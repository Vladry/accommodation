import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import NavBar from "./NavBar";
import {Box} from "@mui/joy";
import {useEffect} from "react";


export default function My_Drawer({children, isDrawerOpen, toggleDrawer}) {

    return (
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
                {children}
            </SwipeableDrawer>
    );
}
