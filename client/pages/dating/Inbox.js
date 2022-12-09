import React from 'react';
import DatingMenuWrapper from "../../components/dating_components/datingMenuItems/DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box, useMediaQuery} from "@mui/material";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';
import DatingSubWrapper from "../../components/dating_components/datingMenuItems/DatingSubWrapper";
import Interlocutors from "@/components/chats/Interlocutors";
import ChatContainer from "@/components/chats/ChatContainer";
import ChatMsgInputBox from "@/components/chats/ChatMsgInputBox";
import DatingMenuDrawer from "@/components/dating_components/DatingMenuDrawer";


const Inbox = () => {

    const title = <h3 className={classes['header']}>{datingMenu[2].title}</h3>;

    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    // const isMediumScreen = useMediaQuery('(min-width: 601px)  && (max-width: 900px)');

    const inboxPage = (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuDrawer hideThreshold={800} menuIndex={2} /> {/*menuIndex - это порядковый номер  массива datingMenu[] файле menuConfig.js*/}


            <Box sx={{display: 'flex', justifyContent: 'center',
                alignItems: isSmallScreen? 'center' : 'flex-start',
                flexFlow: isSmallScreen? 'column noWrap' : 'row noWrap'
                , border: '1px solid red', width: '100%', padding: '2px', gap: '10px', borderRadius: '5px'}}>

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