import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";
import FormMapper from "../../components/forms/FormMapper";
import {datingUserProfileFormFields} from "../../components/forms/datingUserProfileFormFields";
import api from "../../lib/API";
import act from "../../store/types";


const DatingProfile = ({handleSubmit}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userData.user);
    const isAuthenticated = useAuth(true);
    const datingUserProfile = useSelector((state) => state.userData.datingUserProfile);


    const fetchDatingUserProfile = ()=> {
        if (!user) return;
        api.get(`/users/${user.id}/datingProfile`).then((res) => {
            // console.log("now dispatching datingUserProfile to store: ");
            dispatch({type: act.SET_DATING_USER_PROFILE, payload: res});
        }).catch(err => {
            console.log(err)
        });

    }

    useEffect(
        () => {
            if (!user) return;
            // console.log("now doing: fetchDatingUserProfile(): ");
            fetchDatingUserProfile();
        }, [user]
    );

    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user's not defined in store</h3>);


    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >DatingProfile</h3>
            <FormMapper fields={datingUserProfileFormFields}
                        persistedValues={datingUserProfile}
                        validation={null}
                        handleSubmit={handleSubmit}/>
        </div>
    );
};

export default DatingProfile;