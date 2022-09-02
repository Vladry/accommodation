import React, {useEffect} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import api from "../../../lib/API";
import {useSelector} from "react-redux";
import useAuth from "../../../hooks/useAuth";
import UserDatingProfileForm from "../../../components/forms/dating_user_profile_form/UserDatingProfileForm";
import {Grid} from "@mui/material";
import SideBar from "../../../components/dating_components/SideBar";
import ArticleWindow from "../../../components/dating_components/ArticleWindow";
import selectors from "../../../store/selectors";

const UserDatingProfileFormPage = () => {
    const user = useSelector(selectors.user);
    const isAuthenticated = useAuth(true);
const loading = useSelector((state)=>state.userData.loading);
    const handleSubmit = async (values) => {
        const userDatingProfileFormNewValues = {...values, userId: user.id};
        delete userDatingProfileFormNewValues["pictures"];
        delete userDatingProfileFormNewValues["desiredWithInterests"];
        delete userDatingProfileFormNewValues["myGoals"];

console.log(`для юзера: ${user.id}, отправляю данные формы: `, userDatingProfileFormNewValues)
        await api.post(`/users/datingProfile`, userDatingProfileFormNewValues/*,{ contentType: "application/json; charset=utf-8",
            async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
            cache: false,    //This will force requested pages not to be cached by the browser
            processData:false}*/
        ).then((res) => {
            console.log('in handleSubmit.then на фронте, после отправки на бЭк данных. Ответ сервера:', res); // вывод userDatingProfile
        })
            .catch(err => {
                console.log(err);
                console.log('in handleSubmit.then: ошибка фронта отправки данных формы');
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