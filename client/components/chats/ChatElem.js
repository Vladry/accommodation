import React from 'react';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const ChatElem = ({interlocutor}) => {
    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                <Avatar src={interlocutor?.avatar}/>
                <p>{interlocutor.nick}</p>
            </Box>

        </>
    );
};

export default ChatElem;