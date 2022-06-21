import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";
import FormMapper from "../../components/forms/FormMapper";
import {datingUserProfileFormFields} from "../../components/forms/datingUserProfileFormFields";
import api from "../../lib/API";

const DatingProfile = ({handleSubmit}) => {
    const user = useSelector((state) => state.userData.user);
    const isAuthenticated = useAuth(true);
    const [datingUserProfile, setDatingUserProfile] = useState({});

    const fetchDatingUserProfile = () => {
        if (!user) return;

        api.get(`/users/${user.id}/datingProfile`).then((res) => {
            setDatingUserProfile(res);
        }).catch(err => {
                console.log(err)
            });

    }

    useEffect(
        () => {
            if (!user) return;
            fetchDatingUserProfile();
        }, [user]
    );

    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user's not defined in store</h3>);

    console.log('datingUserProfile in body: ', datingUserProfile);

    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >DatingProfile</h3>
            <FormMapper fields={datingUserProfileFormFields} validation={null}

                        handleSubmit={handleSubmit}/>
        </div>
    );
};

export default DatingProfile;