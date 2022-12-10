import React, {useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {Button, Paper} from "@mui/material";
import Box from "@mui/material/Box";

const ChatMessageContextMenu = ({contextEl, contextMenuCloseHandler}) => {
    // https://mui.com/material-ui/react-popover/#anchor-playground
    const open = !!contextEl;
    const id = open ? 'context-menu-popover' : undefined;

    const paragraphStyle = {fontSize: '12px', fontWeight: '500', margin: '5px'}

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
                <Paper elevation={12} sx={{display: 'flex', flexFlow: 'column noWrap', padding: '10px', borderRadius: '10px'}}>
                    <p style={paragraphStyle} onClick={() => {
                    }}>Ответить</p>
                    <p style={paragraphStyle} onClick={() => {
                    }}>Копировать</p>
                    <p style={paragraphStyle} onClick={() => {
                    }}>Выбрать</p>
                    <p style={paragraphStyle} onClick={() => {
                    }}>Изменить</p>
                    <p style={paragraphStyle} onClick={() => {
                    }}>Переслать</p>
                    <p style={{...paragraphStyle, color: 'orange'}} onClick={() => {
                    }}>Удалить у себя</p>
                    <p style={{...paragraphStyle, color: 'red'}} onClick={() => {
                    }}>Удалить у всех</p>
                </Paper>
            </Popover>
        </div>
    );
};

export default ChatMessageContextMenu;