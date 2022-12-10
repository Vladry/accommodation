import React from 'react';
import Box from "@mui/material/Box";
import {useSelector, shallowEqual} from "react-redux";
import DatingChatInterlocutorElem from "@/components/chats/DatingChatInterlocutorElem";
import {useMediaQuery} from "@mui/material";

const Interlocutors = ({title}) => {
    const allowedInterlocutorsData = useSelector(state => state.datingChatData.allowedInterlocutorsData, shallowEqual);
    const isMediumScreen = useMediaQuery('(max-width: 700px)');

    const interlocutorChats = allowedInterlocutorsData.map((interlocutor) =>
        <DatingChatInterlocutorElem
                  key={interlocutor.userId}
                  interlocutor={interlocutor}
        />);


    return (
        <Box sx={{maxHeight: '100vh', minHeight: '60vh', minWidth: isMediumScreen? '50%': '', border: '1px solid green', borderRadius: '20px'}}>
            <div>{title}</div>
            {interlocutorChats}
        </Box>
    );
};

export default Interlocutors;