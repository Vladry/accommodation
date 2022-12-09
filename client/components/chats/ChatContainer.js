import React from 'react';
import classes from "@/components/dating_components/datingMenuItems/dating.module.css";
import Box from "@mui/material/Box";
import {shallowEqual, useSelector} from "react-redux";
import DatingChatMsgElement from "@/components/chats/datingChatMsgElement";

const ChatContainer = () => {
    const activeInterlocutor = useSelector(state => state.datingChatData.activeInterlocutor);
    const receivedMessages = useSelector(state => state.datingChatData.receivedMessages, shallowEqual);
    const sentMessages = useSelector(state => state.datingChatData.sentMessages, shallowEqual);

    const msgContent = [...receivedMessages.filter(msg=>msg.fromUserId===activeInterlocutor),
        ...sentMessages.filter(msg=>msg.toUserId===activeInterlocutor)];
    const sortFn = (a,b) => {
        if (a.timestampCreated < b.timestampCreated) {
            return -1;
        } else {
            return 1;
        }
    }
    msgContent.sort(sortFn);


    const msgElements = msgContent.map((msg, ind) =>(<DatingChatMsgElement key={ind} msg={msg} />));

    return (
        <Box sx={{display: 'flex', flexFlow: 'column noWrap', justifyContent: 'flex-start',
            border: '1px solid blue', width: '70%', borderRadius: '20px'}}>
            <h3 className={classes['header']}>Чат</h3>
            {msgElements}



        </Box>
    );
};

export default ChatContainer;