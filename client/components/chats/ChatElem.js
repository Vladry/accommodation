import React from 'react';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {ACTIONS} from '@/store/datingChats/index';
import {useDispatch, useSelector} from "react-redux";

const ChatElem = ({interlocutor}) => {
    const dispatch = useDispatch();

    const activeInterlocutor = useSelector(state => state.datingChatData.activeInterlocutor);
    console.log("rerender ChatElem")

    const setActiveInterlocutorChat = (event)=>{

        dispatch(ACTIONS.setActiveInterlocutor(interlocutor.userId));
    }

    return (
        <>
            <Box sx={{cursor: 'pointer', display: 'flex', flexDirection: 'row', gap: '10px',
                backgroundColor: (activeInterlocutor === interlocutor.userId) ? 'lightgray' : ''}}
            onClick={setActiveInterlocutorChat}>
                <Avatar src={interlocutor?.avatar}/>
                <p>{interlocutor.nick}</p>
            </Box>

        </>
    );
};

export default ChatElem;