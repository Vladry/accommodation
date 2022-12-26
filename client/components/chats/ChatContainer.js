import React, {useEffect, useMemo, useState} from 'react';
import classes from "@/components/dating_components/datingMenuItems/dating.module.css";
import Box from "@mui/material/Box";
import {shallowEqual, useSelector} from "react-redux";
import DatingChatMsgElement from "@/components/chats/datingChatMsgElement";
import sel from '@/store/user/selectors';
import selDatingChats from '@/store/datingChats/selectors';

const ChatContainer = () => {
    const receivedMessages = useSelector(selDatingChats.receivedMessages, shallowEqual);
    const sentMessages = useSelector(selDatingChats.sentMessages, shallowEqual);
    const activeInterlocutor = useSelector(selDatingChats.activeInterlocutor, shallowEqual);
    const [msgEls, setMsgEls] = useState([]);

    const msgContent = useMemo(() => {
        const sortFn = (a, b) => {
            if (a.createdDate < b.createdDate) {
                return -1;
            } else {
                return 1;
            }
        }

        const content = [...receivedMessages, ...sentMessages];
        content.sort(sortFn);
        return content;
    }, [receivedMessages, sentMessages]);


    useEffect(() => {
        setMsgEls(msgContent.map((msg, ind) => (<DatingChatMsgElement key={ind} msg={msg}/>)));
    }, [activeInterlocutor, msgContent])

    return (
        <Box sx={{
            display: 'flex', flexFlow: 'column noWrap', justifyContent: 'flex-start',
            border: '1px solid blue', borderRadius: '20px'
        }}>
            <h3 className={classes['header']}>Чат</h3>
            {msgEls}


        </Box>
    );
};

export default ChatContainer;