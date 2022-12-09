import React from 'react';
import useAuth from "../../../hooks/useAuth";
import DatingMenu from "./DatingMenu";
import {Box, useMediaQuery} from "@mui/material";

const DatingMenuWrapper = ({disabled, children}) => {
    const isAuthenticated = useAuth(false);

    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const isMediumScreen = useMediaQuery('(min-width: 601px)  && (max-width: 900px)');

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


