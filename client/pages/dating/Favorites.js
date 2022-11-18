import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from './dating.module.css';
const Favorites = () => {
    return (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuWrapper disabled={datingMenu[3].url}>
                {datingMenu[3].linkName}
            </DatingMenuWrapper>
            <h3 className={classes['header']}>{datingMenu[3].title}</h3>
        </Box>
    );
};

export default Favorites;