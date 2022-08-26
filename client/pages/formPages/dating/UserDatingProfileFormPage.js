import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import api from "../../../lib/API";
import {useSelector} from "react-redux";
import useAuth from "../../../hooks/useAuth";
import UserDatingProfileForm from "../../../components/forms/dating_user_profile_form/UserDatingProfileForm";
import {Grid} from "@mui/material";
import SideBar from "../../../components/dating_components/SideBar";
import ArticleWindow from "../../../components/dating_components/ArticleWindow";

const UserDatingProfileFormPage = () => {
    const user = useSelector((state)=>state.userData.user);
    const isAuthenticated = useAuth(true);
const loading = useSelector((state)=>state.userData.loading);
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

    const title = "Edit Your Profile"
    const content = <UserDatingProfileForm handleSubmit={handleSubmit}/>;

    return (
        <Grid container={true} spacing={2}>
            <SideBar>
                <DatingMenuWrapper>
                    {datingMenu[5].linkName}
                </DatingMenuWrapper>
            </SideBar>

            <ArticleWindow title={title} content={content}>
            </ArticleWindow>
        </Grid>
    );
};

export default UserDatingProfileFormPage;