import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import LoginIcon from '@mui/icons-material/Login';

export default function IconLink() {
    return (
        <IconButton component={Link} to="/setting">
            <LoginIcon/>
        </IconButton>
    );
}