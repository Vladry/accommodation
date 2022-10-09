import React from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import api from "../../../lib/API";
import {useDispatch, useSelector} from "react-redux";
import UserDatingProfileForm from "../../../components/forms/dating_user_profile_form/UserDatingProfileForm";
import {Grid} from "@mui/material";
import SideBar from "../../../components/dating_components/SideBar";
import ArticleWindow from "../../../components/dating_components/ArticleWindow";
import sel from "../../../store/selectors";
import {fetchData} from "../../../store/actions/userAction";
import types from "../../../store/types";
import {useRouter} from "next/router";
import urls from "../../../../src/main/resources/urls.json";
import axios from "axios";

const UserDatingProfileFormPage = () => {
    const user = useSelector(sel.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleSubmit = async (values) => {
        const userDatingProfileFormNewValues = {...values, userId: user.id};
        delete userDatingProfileFormNewValues["pictures"];
        delete userDatingProfileFormNewValues["desiredWithInterests"];
        // delete userDatingProfileFormNewValues["myGoals"];
        // console.log("pre-fetch header user.datingServiceParticipation: ", user.datingServiceParticipation);
        // console.log(`для юзера: ${user.id}, отправляю данные формы: `, userDatingProfileFormNewValues)
        // console.log("userDatingProfileFormNewValues: ", userDatingProfileFormNewValues);


        if (typeof (userDatingProfileFormNewValues["myGoals"]) === 'string') {
            userDatingProfileFormNewValues["myGoals"] = userDatingProfileFormNewValues["myGoals"].split(" ").join("").split(",");
            console.log(`userDatingProfileFormNewValues["myGoals"]: `, userDatingProfileFormNewValues["myGoals"]);
        } else if (Array.isArray(userDatingProfileFormNewValues["myGoals"])) {
            console.log(`userDatingProfileFormNewValues["myGoals"]: `, userDatingProfileFormNewValues["myGoals"]);
        }

        if (typeof (userDatingProfileFormNewValues["myInterests"]) === 'string') {
            userDatingProfileFormNewValues["myInterests"] = userDatingProfileFormNewValues["myInterests"].split(" ").join("").split(",");
            console.log(`userDatingProfileFormNewValues["myInterests"]: `, userDatingProfileFormNewValues["myInterests"]);
        } else if (Array.isArray(userDatingProfileFormNewValues["myInterests"])) {
            console.log(`userDatingProfileFormNewValues["myInterests"]: `, userDatingProfileFormNewValues["myInterests"]);
        }


        const baseURL = "http://localhost:8000/api/v1";
        // await api.post(baseURL+urls.datingProfile, userDatingProfileFormNewValues,


        await axios.post(baseURL + urls.datingProfile, userDatingProfileFormNewValues,
            {
                headers: {'datingServiceParticipation': user.datingServiceParticipation} //если еще не зарегистрирован в знакомствах-то, на бЭке по datingServiceParticipation=false запустится регистрация
            }

            // axios({
            //     method: 'post',
            //     url: baseURL+urls.datingProfile,
            //     data: userDatingProfileFormNewValues,
            //         headers: {'datingServiceParticipation': user.datingServiceParticipation}
            // }

            /*,{ contentType: "application/json; charset=utf-8",
            async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
            cache: false,    //This will force requested pages not to be cached by the browser
            processData:false}*/
        ).then((res) => {
            // console.log('in handleSubmit.then на фронте, после отправки на Back-End данных. Ответ сервера:', res); // вывод userDatingProfile
            //обновить в локальном сторе userDatingProfile
            if (res != null) {
                dispatch({type: types.SET_USER_DATING_PROFILE_SUCCESS, payload: res});
            } else {
                console.log("error getting&dispatching updated userDatingProfile!. The store continues holding the old version of userDatingProfile (if any)");
            }
            // dispatch(fetchData(urls.datingProfile, user.id, types.GET_USER_DATING_PROFILE, types.SET_USER_DATING_PROFILE_SUCCESS, types.SET_USER_DATING_PROFILE_FAIL));
            router.push(`${urls.hostPrefix}${urls.dating}`);
        })
            .catch(err => {
                console.log(err);
                console.log(`in api.post(${urls.datingProfile}).then: ошибка фронта отправки данных формы userDatingProfile`);
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