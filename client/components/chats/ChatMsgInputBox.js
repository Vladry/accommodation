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
            fromUserId: user.id,
            toUserId: activeInterlocutor,
            chat: 'dating',
            msg: inputRef.current.value,
            timestampCreated: Date.now(),
            timestampUpdated: 0
        };
        inputRef.current.value = '';

        dispatch(ACTIONS.sendNewMessage(newMessage));
        console.log("newMessage: ", newMessage);
        console.log("user: ", user)
    }


    return (
        <Box sx={{
            alignSelf: isMediumScreen ? '' : 'flex-end',
            border: '1px solid green', width: isMediumScreen ? '75%' : '25%', borderRadius: '20px'
        }}>
            <InputLabel htmlFor="message">Write a message:</InputLabel>
            {/*https://mui.com/material-ui/react-text-field/#basic-textfield*/}
            <TextField inputRef={inputRef} multiline fullWidth
                       id="message" data-name={"message"} label={"text me ..."}
                       helperText={"type here"}
                       onChange={handleInpChange}
            />
            <Button variant={'text'} size={'small'} onClick={handleClear}>Clear</Button>
            <Button variant={'contained'} size={'small'} onClick={handleSend}>Send</Button>
        </Box>
    );
};

export default ChatMsgInputBox;