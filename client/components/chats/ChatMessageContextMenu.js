import React, {useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const ChatMessageContextMenu = ({contextEl, contextMenuCloseHandler}) => {
    // https://mui.com/material-ui/react-popover/#anchor-playground
    const open = !!contextEl;
    const id = open ? 'context-menu-popover' : undefined;

    return (
        <div>
            <Popover
                id={id}
                open={open}
                anchorEl={contextEl}
                onClose={contextMenuCloseHandler}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>The content of chatContentMenu.</Typography>
            </Popover>
        </div>
    );
};

export default ChatMessageContextMenu;