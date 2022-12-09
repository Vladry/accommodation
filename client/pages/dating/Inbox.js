import React from 'react';
import DatingMenuWrapper from "../../components/dating_components/datingMenuItems/DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box, useMediaQuery} from "@mui/material";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';
import DatingSubWrapper from "../../components/dating_components/datingMenuItems/DatingSubWrapper";
import Interlocutors from "@/components/chats/Interlocutors";
import ChatContainer from "@/components/chats/ChatContainer";
import ChatMsgInputBox from "@/components/chats/ChatMsgInputBox";


const Inbox = () => {

    const title = <h3 className={classes['header']}>{datingMenu[2].title}</h3>;

    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const isMediumScreen = useMediaQuery('(min-width: 601px)  && (max-width: 900px)');

    const inboxPage = (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuWrapper  disabled={datingMenu[2].url} >
                {datingMenu[2].linkName}
            </DatingMenuWrapper>

            <Box sx={{display: 'flex', justifyContent: 'center',
                flexFlow: isSmallScreen? 'column noWrap' : 'row noWrap'
                , border: '1px solid red', width: '70%', padding: '2px', gap: '10px', borderRadius: '5px'}}>

                <Interlocutors title={title}/>
                <ChatContainer/>
                <ChatMsgInputBox/>
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