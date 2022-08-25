import React from 'react';
import useAuth from "../../../hooks/useAuth";
import DatingMenu from "./DatingMenu";
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";

const DatingWrapper = ({children}) => {
    const isAuthenticated = useAuth(false);
    const user = useSelector(state=> state.userData.user);

    if (!isAuthenticated) return (<><h3>log into your profile</h3></>);

    return (
        <div>
            <Typography>logged: {user?.email}</Typography>
            <Typography>userId: {user?.id}</Typography>
            <h2>{children}</h2>
            <DatingMenu/>
        </div>
    );
};

export default DatingWrapper;


