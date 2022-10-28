import React, {useState} from 'react';
import My_Drawer from "./appbar/My_Drawer";
import styled from '@emotion/styled';
import MyAppbar from "./appbar/MyAppbar";
import NavBar from "./appbar/NavBar";

const Header = () => {


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);


    return (
        <MyHeader>

            <My_Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
                <NavBar/>
            </My_Drawer>
            <MyAppbar toggleDrawer={toggleDrawer}/>

        </MyHeader>
    );
};

export default Header;



const MyHeader = styled.header(
    ({theme}) => (
        {
            margin: '20px auto',
            ...theme.mixins.toolbar
        }
    )
);

