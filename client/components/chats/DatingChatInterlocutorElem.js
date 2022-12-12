import React from 'react';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {ACTIONS} from '@/store/datingChats/index';
import {useDispatch, useSelector} from "react-redux";
import selDatingChats from "@/store/datingChats/selectors";

const DatingChatInterlocutorElem = ({interlocutor}) => {
    const dispatch = useDispatch();

    const activeInterlocutor = useSelector(selDatingChats.activeInterlocutor);

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

export default DatingChatInterlocutorElem;