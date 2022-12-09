import React from 'react';
import classes from "@/components/dating_components/datingMenuItems/dating.module.css";
import Box from "@mui/material/Box";
import {shallowEqual, useSelector} from "react-redux";

const ChatContainer = () => {
    const receivedMessages = useSelector(state => state.datingChatData.receivedMessages, shallowEqual);

    return (
        <Box sx={{border: '1px solid blue', width: '80%', borderRadius: '20px'}}>
            <h3 className={classes['header']}>Чат</h3>
        </Box>
    );
};

export default ChatContainer;