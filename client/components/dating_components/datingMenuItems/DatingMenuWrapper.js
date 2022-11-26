import React from 'react';
import useAuth from "../../../hooks/useAuth";
import DatingMenu from "./DatingMenu";
import {Box} from "@mui/material";

const DatingMenuWrapper = ({disabled, children}) => {
    const isAuthenticated = useAuth(false);

    if (!isAuthenticated) return (<><h3>log into your profile</h3></>);

    return (
        <Box>
            <h4 style={{textAlign: 'center'}}>{children}</h4>
            <DatingMenu disabled={disabled}/>
        </Box>
    );
};

export default DatingMenuWrapper;
// export default React.memo(DatingMenuWrapper);


