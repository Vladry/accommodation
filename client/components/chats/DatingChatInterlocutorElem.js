import React, {useState} from 'react';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {ACTIONS, ACTIONS_Cust} from "@/store/datingChats";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Badge from "@mui/material/Badge";
import sel from '@/store/user/selectors';
import selDatingChats from "@/store/datingChats/selectors";
import globalVariables from '@/root/globalVariables.json';
import InterlocutorContextMenu from "@/components/chats/InterlocutorContextMenuItems/InterlocutorContextMenu";


const DatingChatInterlocutorElem = ({interlocutor}) => {
    const dispatch = useDispatch();

    const user = useSelector(sel.user);
    const activeInterlocutor = useSelector(selDatingChats.activeInterlocutor);
    const unseenReceivedMessages = useSelector(selDatingChats.unseenReceivedMessages, shallowEqual);


    /*** Управление контекстным меню ***/
    const [isHover, setIsHover] = useState(false);
    const [contextEl, setContextEl] = useState(null);
    const contextMenuOpenHandler = (e) => {
        e.preventDefault();
        setContextEl(e.currentTarget);
    }
    const contextMenuCloseHandler = () => {
        setContextEl(() => null);
        setIsHover(() => false);
    }
    /*** Конец: Управление контекстным меню ***/

    if (!user) return;


    const currInterlocutorChatHandler = (event) => {
        event.stopPropagation();
        console.log("in currInterlocutorChatHandler:")
        dispatch(ACTIONS.setActiveInterlocutor(interlocutor.userId));
        const counterparts = {fromId: interlocutor.userId, toId: user.id};
        const unseenFromThisInterlocutor = unseenReceivedMessages.filter(m => m.toId === user.id && m.fromId === interlocutor.userId);
        if (unseenFromThisInterlocutor?.length > 0) {
            dispatch(ACTIONS_Cust.setMessagesAsSeen(counterparts));
        }
            dispatch(ACTIONS_Cust.getReceivedMessages(counterparts));
            dispatch(ACTIONS_Cust.getSentMessages(counterparts));
    };

    const unseenMessagesFromThisInterlocutor = unseenReceivedMessages.filter(msg => msg.fromId === interlocutor.userId);

    return (
        <>
            <Box sx={{
                cursor: 'pointer', display: 'flex', flexDirection: 'row', gap: '10px',
                borderRadius: '10px',
                backgroundColor: (activeInterlocutor === interlocutor.userId) ? 'lightgray' : '',
                opacity: (interlocutor.blacklisted === true)? 0.4: 1,
                border: (interlocutor.blacklisted === true)? 'solid 1px red' : ''
            }}
                 onClick={currInterlocutorChatHandler}

                 onContextMenu={contextMenuOpenHandler}

                 onMouseEnter={(e) => {
                     setIsHover(() => true);
                 }}
                 onMouseLeave={(e) => {
                     setIsHover(() => false);
                 }}
            >
                {unseenMessagesFromThisInterlocutor?.length > 0 ?
                    <Badge sx={{position: 'relative', top: '10px', left: '56px'}}
                           badgeContent={unseenMessagesFromThisInterlocutor ? `${unseenMessagesFromThisInterlocutor.length}` : ''}
                           color="error">
                    </Badge> : null}
                <Avatar src={interlocutor?.avatar}/>
                <p style={{color: (interlocutor.blacklisted === true)? 'red': 'dark' }}>{interlocutor.nick}</p>
                <p>{interlocutor.userId}</p>

                <InterlocutorContextMenu interlocutorId={interlocutor.userId} contextEl={contextEl}
                                         contextMenuCloseHandler={contextMenuCloseHandler}/>
            </Box>

        </>
    );
};

export default DatingChatInterlocutorElem;