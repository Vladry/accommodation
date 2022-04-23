import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import NavBar from "./NavBar";


export default function My_Drawer({isOpen, toggleDrawer}) {

    return (
        <div>

            <Drawer
                anchor={'left'}
                open={isOpen}
                // onClose={toggleDrawer}
            >
                <Button onClick={toggleDrawer}>Close Dashboard</Button>
                <NavBar/>
            </Drawer>
        </div>
    );
}
