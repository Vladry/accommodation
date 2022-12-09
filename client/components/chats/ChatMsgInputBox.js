import React from 'react';
import Box from "@mui/material/Box";
import {Button, InputLabel, TextField, useMediaQuery} from "@mui/material";

const ChatMsgInputBox = () => {
    const isMediumScreen = useMediaQuery('(max-width: 600px)');

    const handleInpChange = (e) => {
        if (e.target) {
            console.log(e.target.value);
        }
    }
    const handleClear = (e)=>{e.target.value = ''}
    const handleSend = (e)=>{
        console.log(e);
    }


    return (
            <Box sx={{ alignSelf: isMediumScreen? '' : 'flex-end',
                border: '1px solid green', width:  isMediumScreen? '75%' : '25%', borderRadius: '20px'}}>
                <InputLabel htmlFor="message">Write a message:</InputLabel>
                {/*https://mui.com/material-ui/react-text-field/#basic-textfield*/}
                <TextField multiline fullWidth
                           id="message" data-name={"message"} label={"text me ..."}
                           helperText={"type something"}
                           onChange={handleInpChange}
                />
                <Button variant={'text'} size={'small'} onClick={handleClear}>Clear</Button>
                <Button variant={'contained'} size={'small'} onClick={handleSend}>Send</Button>
            </Box>
    );
};

export default ChatMsgInputBox;