import React from 'react';
import useAuth from "../../../hooks/useAuth";
import DatingMenu from "./DatingMenu";
import {Box} from "@mui/material";

const DatingMenuWrapper = ({disabled, children}) => {
    // console.log("render DatingMenuWrapper");
    const isAuthenticated = useAuth(false);

    if (!isAuthenticated) return (<><h3>log into your profile</h3></>);

    return (
        <Box>
            {/*<Typography>logged: {user?.email}</Typography>*/}
            {/*<Typography>userId: {user?.id}</Typography>*/}
            <h2>{children}</h2>
            <DatingMenu disabled={disabled}/>
        </Box>
    );
};

export default DatingMenuWrapper;
// export default React.memo(DatingMenuWrapper);


