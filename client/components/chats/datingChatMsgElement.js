import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import ChatMessageContextMenu from "@/components/chats/ChatMessageContextMenu";

const DatingChatMsgElement = ({msg}) => {
    const activeInterlocutor = useSelector(state => state.datingChatData.activeInterlocutor);
    const [isHover, setIsHover] = useState(false);
    const [contextEl, setContextEl] = useState(null);

    const msgStyling = {
        // display: 'flex', flexFlow: 'row, noWrap',
        alignSelf: (msg.fromUserId === activeInterlocutor) ? 'flex-start' : 'flex-end',
        justifyContent: (msg.fromUserId === activeInterlocutor) ? 'flex-start' : 'flex-end',

        padding: '8px',
        margin: (msg.fromUserId === activeInterlocutor) ? '1px 0px 1px 20px' : '1px 20px 1px 0px',

        background: (msg.fromUserId === activeInterlocutor) ? 'lightblue' : 'goldenrod',
        border: (msg.fromUserId === activeInterlocutor) ? '1px solid red' : '1px solid blue',
        borderRadius: (msg.fromUserId === activeInterlocutor) ? '20px 20px 20px 0px' : '20px 20px 0px 20px'
    }
    const date = new Date(msg.timestampCreated).toLocaleDateString();
    const time = new Date(msg.timestampCreated).toLocaleTimeString();

    const contextMenuOpenHandler = (e) => {
        e.preventDefault();
        setContextEl(e.currentTarget);
    }
    const selectMessage = ()=>{console.log("выделить текущее сообщение")}

    const contextMenuCloseHandler = () =>{
        setContextEl(()=> null);
        setIsHover(() => false);
    }

    const msgLinesStyling = {display: isHover ? 'inline' : 'none', fontSize: '0.7em'};


    return (
        <Box sx={msgStyling}
             onClick={selectMessage}
             onMouseEnter={() => {
                 setIsHover(() => true);
             }}
             onMouseLeave={() => {
                 setIsHover(() => false);
             }}
             onContextMenu={contextMenuOpenHandler}

        >
            <p>{msg.msg}</p>
            <span style={{marginLeft: '10px', ...msgLinesStyling}}>{date},</span>
            <span style={{marginLeft: '10px', ...msgLinesStyling}}>{time.slice(0, -3)}</span>
            <ChatMessageContextMenu contextEl={contextEl} contextMenuCloseHandler={contextMenuCloseHandler}/>
        </Box>
    );
};


export default DatingChatMsgElement;