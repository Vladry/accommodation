import React from 'react';
import DatingMenuWrapper from "../../components/dating_components/datingMenuItems/DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import {Box, Paper, useMediaQuery} from "@mui/material";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';
import DatingSubWrapper from "../../components/dating_components/datingMenuItems/DatingSubWrapper";
import Interlocutors from "@/components/chats/Interlocutors";
import ChatContainer from "@/components/chats/ChatContainer";
import ChatMsgInputBox from "@/components/chats/ChatMsgInputBox";
import DatingMenuDrawer from "@/components/dating_components/DatingMenuDrawer";


const Inbox = () => {

    const title = <h3 className={classes['header']}>{datingMenu[2].title}</h3>;

    const isSmallScreen = useMediaQuery('(max-width: 705px)');
    const isMediumScreen = useMediaQuery('(min-width: 706px)  AND (max-width: 800px)');

    let justifyProp = '';
    if (isSmallScreen) {
        justifyProp = 'center';
    } else if (isMediumScreen) {
        justifyProp = 'flex-end';
    } else {
        justifyProp = 'flex-start';
    }

    const inboxPage = (
        <Box className={classes['dating-sections-container']}>
            <DatingMenuDrawer hideThreshold={700}
                              menuIndex={2}/> {/*menuIndex - это порядковый номер  массива datingMenu[] файле menuConfig.js*/}


            <Paper elevation={12} sx={{
                display: 'flex',
                justifyContent: justifyProp,
                alignItems: isSmallScreen? 'center' : 'flex-start',
                flexFlow: isSmallScreen ? 'column noWrap' : 'row noWrap',
                border: '1px solid red', width: '100%', padding: '2px', gap: '10px', borderRadius: '5px'
            }}
            >

                <Interlocutors title={title}/>
                <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'flex-start'}}>
                    <ChatContainer/>
                    <ChatMsgInputBox/>
                </Box>

            </Paper>

        </Box>
    );

    return (
        // <DatingSubWrapper>
        <>
            {inboxPage}
        </>
        // </DatingSubWrapper>
    );
};

export default Inbox;