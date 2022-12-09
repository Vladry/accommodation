import React, {useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {Button, Paper} from "@mui/material";
import Box from "@mui/material/Box";

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
                <Paper elevation={12} sx={{display: 'flex', flexFlow: 'column noWrap', padding: '10px'}}>
                    <p style={{fontSize: '12px', fontWeight: '500'}} onClick={() => {
                    }}>Ответить</p>
                    <p style={{fontSize: '12px', fontWeight: '500'}} onClick={() => {
                    }}>Копировать</p>
                    <p style={{fontSize: '12px', fontWeight: '500'}} onClick={() => {
                    }}>Выбрать</p>
                    <p style={{fontSize: '12px', fontWeight: '500'}} onClick={() => {
                    }}>Изменить</p>
                    <p style={{fontSize: '12px', fontWeight: '500'}} onClick={() => {
                    }}>Переслать</p>
                    <p style={{fontSize: '12px', fontWeight: '500', color: 'orange'}} onClick={() => {
                    }}>Удалить у себя</p>
                    <p style={{fontSize: '12px', fontWeight: '500', color: 'red'}} onClick={() => {
                    }}>Удалить у всех</p>
                </Paper>
            </Popover>
        </div>
    );
};

export default ChatMessageContextMenu;