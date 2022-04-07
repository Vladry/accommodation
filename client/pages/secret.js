import React from 'react';
import useAuth from "../hooks/useAuth";

const Secret = () => {
    const isAuthenticated = useAuth(true);
    return (
        <>
            {isAuthenticated}
            Secret page!
        </>
    );
};

export default Secret;