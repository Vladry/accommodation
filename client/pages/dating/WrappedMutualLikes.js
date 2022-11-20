import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from './dating.module.css';
import DatingSubWrapper from "./DatingSubWrapper";


const WrappedMutualLikes = () => {

    const page = (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuWrapper disabled={datingMenu[4].url}>  {/*TODO пофиксить disabled*/}
                {datingMenu[4].linkName}
            </DatingMenuWrapper>
            <h3 className={classes['header']}>{datingMenu[4].title}</h3>
        </Box>
    );

    return (
        <DatingSubWrapper>
            {page}
        </DatingSubWrapper>
    );
};

export default WrappedMutualLikes;