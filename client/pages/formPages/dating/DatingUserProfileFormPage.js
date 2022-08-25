import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../../public/menuConfig";
import api from "../../../lib/API";
import {useSelector} from "react-redux";
import useAuth from "../../../hooks/useAuth";
import DatingUserProfileForm from "../../../components/forms/dating_user_profile_form/DatingUserProfileForm";

const DatingUserProfileFormPage = () => {
    const user = useSelector((state)=>state.userData.user);
    const isAuthenticated = useAuth(true);

    const handleSubmit = async (values) => {
        values = {...values, userId: user.id};

        await api.get(`/users/${user.id}/datingProfile`, values
        ).then((res) => {
            console.log(res); // вывод datingUserProfile
        })
            .catch(err => {
                console.log(err)
            });
    };

    return (
        <div>
            <DatingWrapper>
                {datingMenu[5].linkName}
            </DatingWrapper>
            <DatingUserProfileForm handleSubmit={handleSubmit}/>
        </div>
    );
};

export default DatingUserProfileFormPage;