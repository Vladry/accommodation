import React, {useRef} from 'react';
import Box from "@mui/material/Box";
import {Button, InputLabel, TextField, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import selUser from '@/store/user/selectors';
import selDatingChats from '@/store/datingChats/selectors';
import {ACTIONS, ACTIONS_Cust} from '@/store/datingChats';
import destinations from "../../../src/main/resources/destinations.json";

const ChatMsgInputBox = () => {
    const inputRef = useRef();
    const isMediumScreen = useMediaQuery('(max-width: 600px)');
    const activeInterlocutor = useSelector(selDatingChats.activeInterlocutor);
    const unseenReceivedMessages = useSelector(selDatingChats.unseenReceivedMessages, shallowEqual);
    const user = useSelector(selUser.user, shallowEqual);
    const stompClient = useSelector(selUser.stompClient);
    const dispatch = useDispatch();
    if (!user) return;


    const clearUnseenMessages = () => {
        const counterparts = {fromId: activeInterlocutor, toId: user.id};
        const unseenFromThisInterlocutor = unseenReceivedMessages.filter(m => m.toId === user.id && m.fromId === activeInterlocutor);
        if (unseenFromThisInterlocutor?.length > 0) {
            dispatch(ACTIONS_Cust.setMessagesAsSeen(counterparts));
        }
    }

    const handleInpChange = (e) => {
        if (e.target) {
            // console.log(e.target.value);
        }
    }
    const handleClear = () => {
        inputRef.current.value = '';
    }
    const handleSend = () => {
        clearUnseenMessages();
        const newMessage = {
            destination: `${destinations.datingMessageSentNotifications}${activeInterlocutor}`,
            type: "DATING_MESSAGE_SENT_NOTIFICATION", // id.current обязательно, иначе: Cannot read properties of null (reading 'id')
            chat: 'dating',
            value: inputRef.current.value,
            fromId: user.id,
            toId: activeInterlocutor,
            timestampCreated: Date.now(),
            timestampUpdated: 0
        };
        inputRef.current.value = '';
        const counterparts = {fromId: activeInterlocutor, toId: user.id};
        const data = {msg: newMessage, client: stompClient, counterparts: counterparts};
        dispatch(ACTIONS_Cust.sendNewMessage(data));
    }


    return (
        <Box sx={{
            marginTop: '30px',
            borderRadius: '20px', border: '1px solid green'
        }}>
            {/*<InputLabel htmlFor="message"></InputLabel>*/}
            <TextField inputRef={inputRef} multiline fullWidth
                       id="message" data-name={"message"} /*label={"text me ..."}*/
                // helperText={"type here"}
                       onChange={handleInpChange} /*onFocus={clearUnseenMessages}*/
            />
            <Button variant={'contained'} size={'small'} onClick={handleSend}>Send</Button>
            <Button variant={'outlined'} size={'small'} onClick={handleClear}>Clear</Button>
        </Box>
    );
};

export default ChatMsgInputBox;