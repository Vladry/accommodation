import React, {useEffect} from 'react';
import classes from "@/components/dating_components/datingMenuItems/dating.module.css";
import Box from "@mui/material/Box";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import DatingChatMsgElement from "@/components/chats/datingChatMsgElement";
import api from "../../lib/API";
import sel from '@/store/user/selectors';
import {ACTIONS} from "@/store/datingChats";
import urls from '../../../src/main/resources/urls.json';

const ChatContainer = () => {
    const activeInterlocutor = useSelector(state => state.datingChatData.activeInterlocutor);
    const user = useSelector(sel.user);
    const receivedMessages = useSelector(state => state.datingChatData.receivedMessages, shallowEqual);
    const sentMessages = useSelector(state => state.datingChatData.sentMessages, shallowEqual);
    const allMessages = useSelector(state => state.datingChatData.allMessages, shallowEqual);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!user) return;
        // console.log(`fetching to:  /messages/chat/from/to?chat=dating&fromId=${activeInterlocutor}&toId=${user.id}`);
        api.get( `${urls.chatMessages}?chat=dating&fromId=${activeInterlocutor}&toId=${user.id}`).then(
            messages => {
                dispatch(ACTIONS.setAllMessages(messages));
                // console.log("got messages from DB: ", messages);
            }
        );
    },[activeInterlocutor])

    const msgContent = [...receivedMessages.filter(msg=>msg.fromId===activeInterlocutor),
        ...sentMessages.filter(msg=>msg.toId===activeInterlocutor),
        ...allMessages
    ];
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
            border: '1px solid blue', borderRadius: '20px'}}>
            <h3 className={classes['header']}>Чат</h3>
            {msgElements}



        </Box>
    );
};

export default ChatContainer;