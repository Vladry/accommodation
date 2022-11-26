import React from 'react';
import DatingMenuWrapper from "../../components/dating_components/datingMenuItems/DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';

const SearchCriteria = () => {

    return (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuWrapper disabled={datingMenu[5].url}>
                {datingMenu[5].linkName}
            </DatingMenuWrapper>
            <h3 className={classes['header']}>{datingMenu[5].title}</h3>
        </Box>
    );
};

export default SearchCriteria;