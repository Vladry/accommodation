import React from 'react';
import classes from "@/components/dating_components/datingMenuItems/dating.module.css";
import Box from "@mui/material/Box";
import {shallowEqual, useSelector} from "react-redux";
import DatingChatMsgElement from "@/components/chats/datingChatMsgElement";
import sel from '@/store/user/selectors';
import selDatingChats from '@/store/datingChats/selectors';

const ChatContainer = () => {
    const receivedMessages = useSelector(selDatingChats.receivedMessages, shallowEqual);
    const sentMessages = useSelector(selDatingChats.sentMessages, shallowEqual);

    const msgContent = [...receivedMessages, ...sentMessages];
// console.log("before sorting: ", msgContent)
    const sortFn = (a, b) => {
        if (a.createdDate < b.createdDate) {
            return -1;
        } else {
            return 1;
        }
    }
    msgContent.sort(sortFn);
    // console.log("after sorting: ", msgContent)

    const msgElements = msgContent.map((msg, ind) => (<DatingChatMsgElement key={ind} msg={msg}/>));

    return (
        <Box sx={{
            display: 'flex', flexFlow: 'column noWrap', justifyContent: 'flex-start',
            border: '1px solid blue', borderRadius: '20px'
        }}>
            <h3 className={classes['header']}>Чат</h3>
            {msgElements}


        </Box>
    );
};

export default ChatContainer;