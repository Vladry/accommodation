import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from './dating.module.css';
import {useSelector} from "react-redux";
import sel from "../../store/selectors";
import {useRouter} from "next/router";
import urls from "../../../src/main/resources/urls.json";


const Inbox = () => {

    const datingServiceParticipation = useSelector(sel.datingServiceParticipation);
    const router = useRouter();
    if (!datingServiceParticipation){router.push(`${urls.hostPrefix}${urls.dating}`).then();}

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