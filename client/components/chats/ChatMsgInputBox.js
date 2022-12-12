import React, {useRef} from 'react';
import Box from "@mui/material/Box";
import {Button, InputLabel, TextField, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import sel from '@/store/user/selectors';
import {ACTIONS} from '@/store/datingChats';

const ChatMsgInputBox = () => {
    const inputRef = useRef();
    const isMediumScreen = useMediaQuery('(max-width: 600px)');
    const activeInterlocutor = useSelector(state => state.datingChatData.activeInterlocutor);
    const user = useSelector(sel.user, shallowEqual);
    const dispatch = useDispatch();
    if(!user) return;
    const handleInpChange = (e) => {
        if (e.target) {
            // console.log(e.target.value);
        }
    }
    const handleClear = () => {
        inputRef.current.value = '';
    }
    const handleSend = () => {
        const newMessage = {
            fromId: user.id,
            toId: activeInterlocutor,
            chat: 'dating',
            value: inputRef.current.value,
            timestampCreated: Date.now(),
            timestampUpdated: 0
        };
        inputRef.current.value = '';

        dispatch(ACTIONS.sendNewMessage(newMessage));
        // console.log("newMessage: ", newMessage);
    }


    return (
        <Box sx={{
            marginTop: '30px',
            // alignSelf: isMediumScreen ? '' : 'flex-end',
            // alignSelf: 'center',
            // width: isMediumScreen ? '75%' : '25%',
            borderRadius: '20px', border: '1px solid green'
        }}>
            {/*<InputLabel htmlFor="message"></InputLabel>*/}
            <TextField inputRef={inputRef} multiline fullWidth
                       id="message" data-name={"message"} /*label={"text me ..."}*/
                       // helperText={"type here"}
                       onChange={handleInpChange}
            />
            <Button variant={'contained'} size={'small'} onClick={handleSend}>Send</Button>
            <Button variant={'outlined'} size={'small'} onClick={handleClear}>Clear</Button>
        </Box>
    );
};

export default ChatMsgInputBox;