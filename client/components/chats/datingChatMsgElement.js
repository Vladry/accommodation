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

        paddingLeft: '8px',
        paddingRight: '8px',
        margin: (msg.fromUserId === activeInterlocutor) ? '1px 0px 1px 20px' : '1px 20px 1px 0px',

        background: (msg.fromUserId === activeInterlocutor) ? 'lightblue' : 'goldenrod',
        border: (msg.fromUserId === activeInterlocutor) ? '1px solid red' : '1px solid blue',
        borderRadius: (msg.fromUserId === activeInterlocutor) ? '20px 20px 20px 0px' : '20px 20px 0px 20px'
    }
    const date = new Date(msg.timestampCreated).toLocaleDateString();
    const time = new Date(msg.timestampCreated).toLocaleTimeString().slice(0, -3);
    const updateDate = new Date(msg.timestampUpdated).toLocaleDateString();
    const updateTime = new Date(msg.timestampUpdated).toLocaleTimeString().slice(0, -3);
    const isMsgWasUpdated = (msg.timestampUpdated !=null && msg.timestampUpdated > 0);

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
            <p style={{padding: '1px', margin: '1px'}}>{msg.msg}</p>
            {isHover? <p style={{color: 'grey', marginLeft: '3px', ...msgLinesStyling}}>created: {date},</p> : null}
            {isHover? <p style={{color: 'grey', marginLeft: '3px', ...msgLinesStyling}}>{time}</p> : null}
            {isMsgWasUpdated? <span  style={{color: 'maroon', marginLeft: '3px', ...msgLinesStyling}}>/ updated:</span> : null}
            {isMsgWasUpdated && (date !== updateDate)? <p style={{color: 'maroon', marginLeft: '3px', ...msgLinesStyling}}>{updateDate},</p> : null}
            {isMsgWasUpdated? <p style={{color: 'maroon', marginLeft: '3px', ...msgLinesStyling}}>{updateTime}</p> : null}
            <ChatMessageContextMenu contextEl={contextEl} contextMenuCloseHandler={contextMenuCloseHandler}/>
        </Box>
    );
};


export default DatingChatMsgElement;