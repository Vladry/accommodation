import React from 'react';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {ACTIONS, ACTIONS_Cust} from "@/store/datingChats";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import selDatingChats from "@/store/datingChats/selectors";
import Badge from "@mui/material/Badge";
import sel from '@/store/user/selectors';
import globalVariables from '@/root/globalVariables.json';


const DatingChatInterlocutorElem = ({interlocutor}) => {
    const dispatch = useDispatch();

    const user = useSelector(sel.user);
    const activeInterlocutor = useSelector(selDatingChats.activeInterlocutor);
    const unseenReceivedMessages = useSelector(selDatingChats.unseenReceivedMessages, shallowEqual);

    if( !(user && activeInterlocutor)) return;

    const currInterlocutorChatHandler = (event) => {
        dispatch(ACTIONS.setActiveInterlocutor(interlocutor.userId));
        const counterparts = {fromId: interlocutor.userId, toId: user.id};
        const unseenFromThisInterlocutor = unseenReceivedMessages.filter(m=> m.toId===user.id && m.fromId===interlocutor.userId);
        if (unseenFromThisInterlocutor?.length>0) {
            dispatch(ACTIONS_Cust.setMessagesAsSeen(counterparts));
        }
       const seenMsgReduxRefresh = setTimeout( () => {
            dispatch(ACTIONS_Cust.getReceivedMessages(counterparts));
            dispatch(ACTIONS_Cust.getSentMessages(counterparts));
            clearTimeout(seenMsgReduxRefresh);
        }, globalVariables.reduxUpdateAfterClearingSeenFlagInMessages);
    };

    const unseenMessagesFromThisInterlocutor = unseenReceivedMessages.filter(msg => msg.fromId === interlocutor.userId);

    return (
        <>
            <Box sx={{
                cursor: 'pointer', display: 'flex', flexDirection: 'row', gap: '10px',
                backgroundColor: (activeInterlocutor === interlocutor.userId) ? 'lightgray' : ''
            }}
                 onClick={currInterlocutorChatHandler}>
                {unseenMessagesFromThisInterlocutor?.length > 0 ?
                    <Badge sx={{position: 'relative', top: '10px', left: '56px'}}
                           badgeContent={unseenMessagesFromThisInterlocutor ? `${unseenMessagesFromThisInterlocutor.length}` : ''}
                           color="error">
                    </Badge> : null}
                <Avatar src={interlocutor?.avatar}/>
                <p>{interlocutor.nick}</p>
                <p>{interlocutor.userId}</p>


            </Box>

        </>
    );
};

export default DatingChatInterlocutorElem;