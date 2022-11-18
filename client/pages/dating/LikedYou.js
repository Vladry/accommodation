import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from './dating.module.css';
const LikedYou = () => {
    return (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuWrapper disabled={datingMenu[1].url}>
                {datingMenu[1].linkName}
            </DatingMenuWrapper>
            <h3 className={classes['header']}>{datingMenu[1].title}</h3>
        </Box>
    );
};

export default LikedYou;