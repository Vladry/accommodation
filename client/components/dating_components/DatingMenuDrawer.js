import React, {useState} from 'react';
import {Box, useMediaQuery} from "@mui/material";
import My_Drawer from "@/components/appbar/My_Drawer";
import DatingMenuWrapper from "@/components/dating_components/datingMenuItems/DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import ToggleMenuIconButton from "@/components/ToggleMenuIconButton";

const DatingMenuDrawer = ({menuIndex, hideThreshold}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen((isDrawerOpen) => !isDrawerOpen);
    const isSmallScreen = useMediaQuery(`(max-width: ${hideThreshold}px)`);

    return (
        <Box>
            {isSmallScreen &&
                <My_Drawer
                    isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
                    <DatingMenuWrapper disabled={datingMenu[menuIndex].url}>
                        {datingMenu[menuIndex].linkName}
                    </DatingMenuWrapper>
                </My_Drawer>}
            {isSmallScreen && <Box sx={{position: 'absolute', top: '1px', left: '15px'}}>
                <ToggleMenuIconButton
                    color={'#333A9D'} toggleDrawer={toggleDrawer}/></Box>}


            {!isSmallScreen && <DatingMenuWrapper disabled={datingMenu[menuIndex].url}>
                {datingMenu[menuIndex].linkName}
            </DatingMenuWrapper>}
        </Box>

    );
};

export default DatingMenuDrawer;