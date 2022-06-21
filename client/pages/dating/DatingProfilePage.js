import React from 'react';
import DatingWrapper from "./DatingWrapper";
import {datingMenu} from "../../public/menuConfig";
import DatingProfile from "./DatingProfile";
import api from "../../lib/API";
import {useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";

const DatingProfilePage = () => {
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
                <DatingProfile  handleSubmit={handleSubmit}/>
            </DatingWrapper>
        </div>
    );
};

export default DatingProfilePage;