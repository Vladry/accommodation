import React from 'react';
import Box from "@mui/material/Box";
import {useSelector, shallowEqual} from "react-redux";
import ChatElem from "@/components/chats/ChatElem";

const Interlocutors = ({title}) => {

    const allowedInterlocutorsData = useSelector(state => state.datingChatData.allowedInterlocutorsData, shallowEqual);
    const interlocutorChats = allowedInterlocutorsData.map((interlocutor, ind) => <ChatElem key={ind} interlocutor={interlocutor}/>);


    return (
        <Box sx={{border: '1px solid green', width: '20%', borderRadius: '20px'}}>
            <div>{title}</div>
            {interlocutorChats}
        </Box>
    );
};

export default Interlocutors;