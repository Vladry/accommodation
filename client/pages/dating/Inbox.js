import React from 'react';
import DatingMenuWrapper from "../../components/dating_components/datingMenuItems/DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';
import {useSelector} from "react-redux";
import sel from "../../store/selectors";
import {useRouter} from "next/router";
import urls from "../../../src/main/resources/urls.json";
import DatingSubWrapper from "../../components/dating_components/datingMenuItems/DatingSubWrapper";


const Inbox = () => {

    const inboxPage = (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuWrapper  disabled={datingMenu[2].url} >
                {datingMenu[2].linkName}
            </DatingMenuWrapper>
            <h3 className={classes['header']}>{datingMenu[2].title}</h3>
        </Box>
    );

    return (
        <DatingSubWrapper>
            {inboxPage}
        </DatingSubWrapper>
    );
};

export default Inbox;