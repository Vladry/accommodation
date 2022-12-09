import React from 'react';
import Box from "@mui/material/Box";
import {useSelector, shallowEqual} from "react-redux";
import ChatElem from "@/components/chats/ChatElem";
import {useMediaQuery} from "@mui/material";

const Interlocutors = ({title}) => {
    const allowedInterlocutorsData = useSelector(state => state.datingChatData.allowedInterlocutorsData, shallowEqual);
    const isMediumScreen = useMediaQuery('(max-width: 800px)');
    // const isMediumScreen = useMediaQuery('(min-width: 601px)  && (max-width: 900px)');

    const interlocutorChats = allowedInterlocutorsData.map((interlocutor) =>
        <ChatElem
                  key={interlocutor.userId}
                  interlocutor={interlocutor}
        />);


    return (
        <Box sx={{border: '1px solid green', width:  isMediumScreen? '75%' : '25%', borderRadius: '20px'}}>
            <div>{title}</div>
            {interlocutorChats}
        </Box>
    );
};

export default Interlocutors;