import React from 'react';
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';
import DatingSubWrapper from "../../components/dating_components/datingMenuItems/DatingSubWrapper";
import DatingMenuDrawer from "@/components/dating_components/DatingMenuDrawer";


const MutualLikes = () => {

    const mutualLikesPage = (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuDrawer hideThreshold={600} menuIndex={4} />
            <h3 className={classes['header']}>{datingMenu[4].title}</h3>
        </Box>
    );

    return (
        <DatingSubWrapper>
            {mutualLikesPage}
        </DatingSubWrapper>
    );
};

export default MutualLikes;