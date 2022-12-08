import React from 'react';
import DatingMenuWrapper from "../../components/dating_components/datingMenuItems/DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box} from "@mui/material";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';
import DatingSubWrapper from "../../components/dating_components/datingMenuItems/DatingSubWrapper";
import Interlocutors from "@/components/chats/Interlocutors";
import ChatContainer from "@/components/chats/ChatContainer";


const Inbox = () => {

    const title = <h3 className={classes['header']}>{datingMenu[2].title}</h3>;

    const inboxPage = (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuWrapper  disabled={datingMenu[2].url} >
                {datingMenu[2].linkName}
            </DatingMenuWrapper>

            <Box sx={{display: 'flex', flexFlow: 'row noWrap', justifyContent: 'center'
                , border: '1px solid red', width: '70%', padding: '2px', gap: '10px', borderRadius: '5px'}}>

                <Interlocutors title={title}/>
                <ChatContainer/>

            </Box>
        </Box>
    );

    return (
        <DatingSubWrapper>
            {inboxPage}
        </DatingSubWrapper>
    );
};

export default Inbox;