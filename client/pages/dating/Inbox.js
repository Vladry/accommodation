import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from './dating.module.css';

const Inbox = () => {
    return (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuWrapper  disabled={datingMenu[2].url} >
                {datingMenu[2].linkName}
            </DatingMenuWrapper>
            <h3 className={classes['header']}>{datingMenu[2].title}</h3>
        </Box>
    );
};

export default Inbox;