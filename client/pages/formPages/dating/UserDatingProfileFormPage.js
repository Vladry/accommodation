import React, {useEffect} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import api from "../../../lib/API";
import {useDispatch, useSelector} from "react-redux";
import useAuth from "../../../hooks/useAuth";
import UserDatingProfileForm from "../../../components/forms/dating_user_profile_form/UserDatingProfileForm";
import {Grid} from "@mui/material";
import SideBar from "../../../components/dating_components/SideBar";
import ArticleWindow from "../../../components/dating_components/ArticleWindow";
import selectors from "../../../store/selectors";
import {fetchDatingProfile, getDatingProfile} from "../../../store/actions/userAction";
import types from "../../../store/types";
import {useRouter} from "next/router";

const UserDatingProfileFormPage = () => {
    const user = useSelector(selectors.user);
    const dispatch = useDispatch();
    const isAuthenticated = useAuth(true);
    const loading = useSelector((state) => state.userData.loading);
    const router = useRouter();
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
            console.log('in handleSubmit.then на фронте, после отправки на Back-End данных. Ответ сервера:', res); // вывод userDatingProfile
            //обновить в локальном сторе userDatingProfile
            dispatch(getDatingProfile(user.id, types.GET_USER_DATING_PROFILE, types.SET_USER_DATING_PROFILE_SUCCESS, types.SET_USER_DATING_PROFILE_FAIL));
            router.push("http://localhost:3000/formPages/dating");
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