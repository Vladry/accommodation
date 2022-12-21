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
        alignSelf: (msg.fromId === activeInterlocutor) ? 'flex-start' : 'flex-end',
        justifyContent: (msg.fromId === activeInterlocutor) ? 'flex-start' : 'flex-end',

        paddingLeft: '8px',
        paddingRight: '8px',
        margin: (msg.fromId === activeInterlocutor) ? '1px 0px 1px 20px' : '1px 20px 1px 0px',

        background: (msg.fromId === activeInterlocutor) ? 'lightblue' : 'goldenrod',
        border: (msg.fromId === activeInterlocutor) ? '1px solid red' : '1px solid blue',
        borderRadius: (msg.fromId === activeInterlocutor) ? '20px 20px 20px 0px' : '20px 20px 0px 20px'
    }

    const date = new Date(msg.createdDate).toLocaleDateString();
    const time = new Date(msg.createdDate).toLocaleTimeString().slice(0, -3);
    const updateDate = new Date(msg.lastModifiedDate).toLocaleDateString();
    const updateTime = new Date(msg.lastModifiedDate).toLocaleTimeString().slice(0, -3);
    const isMsgWasUpdated = (msg.lastModifiedDate !=null && msg.lastModifiedDate > 0);

    const selectMessage = ()=>{console.log("выделить текущее сообщение")}

    const contextMenuOpenHandler = (e) => {
        e.preventDefault();
        setContextEl(e.currentTarget);

    }

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
            <p style={{padding: '1px', margin: '1px'}}>{msg.value}</p>
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