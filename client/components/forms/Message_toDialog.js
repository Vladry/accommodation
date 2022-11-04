import React, {useRef} from 'react';
import {
    Box,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    TextField,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Draggable from "react-draggable";
import {useTheme} from "@mui/material/styles";

const MessageToDialog = (props) => {
    const {
        sendToName,
        isPaid,
        isMessageDialogOpen,
        closeMessageDialog,
        textFieldRef,
        handleInpChange,
        sendMessageHandler,
        candidateAvatar,
        messagingWarning
    } = props;

    const theme = useTheme();

    return (
        <>
            <Dialog
                aria-labelledby="draggable-dialog-title"
                PaperComponent={PaperComponent}
                fullWidth={true}
                maxWidth={'sm'}
                sx={{borderRadius: `${theme.cardBoxParams.borderRadius}`}}
                open={isMessageDialogOpen}
                onClose={closeMessageDialog}
                aria-describedby="dialog-description"
            >


                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">

                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', m: 4}}>
                        <ChatIcon sx={{width: '50px', height: '50px'}}/>

                        <Box sx={{
                            m: '0 auto',
                            color: isPaid ? 'green' : `${theme.palette.error.custom3}`
                        }}>
                            {messagingWarning}
                        </Box>

                        {candidateAvatar}
                        <CloseIcon sx={{marginLeft: '30px', cursor: 'pointer'}} onClick={closeMessageDialog}/>
                    </Box>


                </DialogTitle>


                <DialogContent>
                    <InputLabel htmlFor="message">messaging {sendToName}:</InputLabel>

                    {/*https://mui.com/material-ui/react-text-field/#basic-textfield*/}
                    <TextField inputRef={textFieldRef} multiline fullWidth disabled={!isPaid}
                               id="message" data-name={"message"} label={isPaid ? "text me ..." : 'check your balance'}
                               helperText={isPaid ? "type something" : ' '}
                               error={!isPaid}
                               onChange={handleInpChange}
                    />
                    <DialogContentText>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                </DialogActions>


                <Box disabled={!isPaid} onClick={sendMessageHandler}
                     sx={{
                         display: 'flex',
                         justifyContent: 'center',
                         gap: '15px',
                         cursor: 'pointer',
                         mb: '30px',
                         opacity: isPaid ? 1 : 0.4
                     }}>

                    <span>Send</span>
                    <SendIcon color="primary"/>
                </Box>
            </Dialog>
        </>
    );


    function PaperComponent(props) {
        const nodeRef = useRef(null);
        return (
            <Draggable nodeRef={nodeRef} handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper ref={nodeRef} {...props} />
            </Draggable>
        );
    }

};

export default MessageToDialog;