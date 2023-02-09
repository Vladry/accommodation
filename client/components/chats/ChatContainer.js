import React, {useEffect, useState} from 'react';
import classes from "@/components/dating_components/datingMenuItems/dating.module.css";
import Box from "@mui/material/Box";
import {shallowEqual, useSelector} from "react-redux";
import DatingChatMsgElement from "@/components/chats/datingChatMsgElement";
import selDatingChats from '@/store/datingChats/selectors';


const sortFn = (a, b) => {
    if (a.createdDate < b.createdDate) {
        return -1;
    } else {
        return 1;
    }
};

const ChatContainer = () => {
    const receivedMessages = useSelector(selDatingChats.receivedMessages, shallowEqual);
    const sentMessages = useSelector(selDatingChats.sentMessages, shallowEqual);
    const [msgEls, setMsgEls] = useState([]);




useEffect(() => {
    const msgContent = [...receivedMessages, ...sentMessages].sort(sortFn);
    setMsgEls(msgContent.map((msg, ind) => (<DatingChatMsgElement key={ind} msg={msg}/>)));
}, [receivedMessages, sentMessages])


return (
    <Box sx={{
        display: 'flex', flexFlow: 'column noWrap', justifyContent: 'flex-start',
        border: '1px solid blue', borderRadius: '20px'
    }}>
        <h3 className={classes['header']}>Чат</h3>
        {msgEls}


    </Box>
);
}
;

export default ChatContainer;