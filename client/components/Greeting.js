import React from 'react';
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";

const Greeting = () => {

    const user = useSelector( store => store.userData.user );

    if (!user) return null;

    return (
        <>
            <Typography style={{margin: '0 20px'}} variant='subtitle1'>
            Hi {user?.name && user.name} {user?.lastName && user.lastName} !
            </Typography>
        </>
    );
};

export default Greeting;