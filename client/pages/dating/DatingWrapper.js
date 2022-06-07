import React from 'react';
import useAuth from "../../hooks/useAuth";
import DatingMenu from "./DatingMenu";

const DatingWrapper = ({children}) => {
    const isAuthenticated = useAuth(false);
    if (!isAuthenticated) return (<><h3>log into your profile</h3></>);

    return (
        <div>
            <h2>{children}</h2>
            <DatingMenu/>
        </div>
    );
};

export default DatingWrapper;


