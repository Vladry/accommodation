import React from 'react';
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';
import DatingSubWrapper from "../../components/dating_components/datingMenuItems/DatingSubWrapper";
import DatingMenuDrawer from "@/components/dating_components/DatingMenuDrawer";

const LikedYou = () => {

    const likedYouPage = (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuDrawer hideThreshold={600} menuIndex={1}/>
            <h3 className={classes['header']}>{datingMenu[1].title}</h3>
        </Box>
    );

    return (
        <DatingSubWrapper>
            {likedYouPage}
        </DatingSubWrapper>
    );
};

export default LikedYou;