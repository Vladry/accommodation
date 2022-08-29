import React, {useEffect} from 'react';
import useAuth from "../../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";

const Index = () => {
    const isAuthenticated = useAuth(true);
    const profile = useSelector(state => state.userData.user);


    return (
        <div>
            {JSON.stringify(profile)}
        </div>
    );
};

export default Index;