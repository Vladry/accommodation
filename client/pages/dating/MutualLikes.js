import React from 'react';
import DatingMenuWrapper from "../../components/dating_components/datingMenuItems/DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';
import DatingSubWrapper from "../../components/dating_components/datingMenuItems/DatingSubWrapper";


const MutualLikes = () => {

    const mutualLikesPage = (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuWrapper disabled={datingMenu[4].url}>
                {datingMenu[4].linkName}
            </DatingMenuWrapper>
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