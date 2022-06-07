import React from 'react';
import useAuth from "../../hooks/useAuth";
import DatingMenu from "./DatingMenu";

const DatingWrapper = ({title, children}) => {
    const isAuthenticated = useAuth(false);
    if (!isAuthenticated) return (<><h3>log into your profile</h3></>);

    return (
        <div>
            <DatingMenu/>
            {title}
            {children}
        </div>
    );
};

export default DatingWrapper;


