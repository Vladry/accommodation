import React from 'react';
import {datingMenu} from "../../public/menuConfig";
import {useDispatch, useSelector} from "react-redux";
import UdpForm from "../../components/forms/dating_user_profile_form/UdpForm";
import {Paper} from "@mui/material";
import sel from "../../store/selectors";
import types from "../../store/types";
import {useRouter} from "next/router";
import urls from "../../../src/main/resources/urls.json";
import axios from "axios";
import {useTheme} from "@mui/material/styles";
import BackButton from "../../components/BackButton";
import classes from './dating.module.css';

const UdpFormPage = () => {
    const user = useSelector(sel.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();
    const handleSubmit = async (values) => {
        const userDatingProfileFormNewValues = {...values, userId: user.id};
        delete userDatingProfileFormNewValues["ageRange"];//обязательно к удалению из списка аргументов на бЭк!
        delete userDatingProfileFormNewValues["heightRange"];//обязательно к удалению из списка аргументов на бЭк!
        delete userDatingProfileFormNewValues["pictures"];
        delete userDatingProfileFormNewValues["desiredWithInterests"];
        delete userDatingProfileFormNewValues["name"];
        delete userDatingProfileFormNewValues["location"];
        delete userDatingProfileFormNewValues["lastVisit"];
        delete userDatingProfileFormNewValues["age"];


        if (typeof (userDatingProfileFormNewValues["myGoals"]) === 'string') {
            userDatingProfileFormNewValues["myGoals"] = userDatingProfileFormNewValues["myGoals"].split(" ").join("").split(",");
        } else if (Array.isArray(userDatingProfileFormNewValues["myGoals"])) {
            // console.log(`userDatingProfileFormNewValues["myGoals"]: `, userDatingProfileFormNewValues["myGoals"]);
        }

        if (typeof (userDatingProfileFormNewValues["myInterests"]) === 'string') {
            userDatingProfileFormNewValues["myInterests"] = userDatingProfileFormNewValues["myInterests"].split(" ").join("").split(",");
        } else if (Array.isArray(userDatingProfileFormNewValues["myInterests"])) {
            // console.log(`userDatingProfileFormNewValues["myInterests"]: `, userDatingProfileFormNewValues["myInterests"]);
        }


        const baseURL = "http://localhost:8000/api/v1";
        // await api.post(baseURL+urls.datingProfile, userDatingProfileFormNewValues,


        await axios.post(baseURL + urls.datingProfile, userDatingProfileFormNewValues,
            {
                headers: {'datingServiceParticipation': user.datingServiceParticipation} //если еще не зарегистрирован в знакомствах-то, на бЭке по datingServiceParticipation=false запустится регистрация
            }
        ).then((res) => {
            // console.log('in handleSubmit.then на фронте, после отправки на Back-End данных. Ответ сервера:', res); // вывод userDatingProfile
            //обновить в локальном сторе userDatingProfile
            if (res != null) {
                console.log("fetched userDatingProfile. res: ", res);
                //записывать в state лучше не ответ сервера, а отправляемые данные, т.к. сервер возвращает birthday в стандартном (не подходящем мне) формате -будет ошибка!
                dispatch({type: types.SET_USER_DATING_PROFILE_SUCCESS, payload: userDatingProfileFormNewValues});
                // dispatch({type: types.SET_USER_DATING_PROFILE_SUCCESS, payload: res.data});
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


    return (
        <Paper sx={{border: '1px solid green',
            ...theme.paperProps
        }}>
            <h3 className={classes['header']}>{datingMenu[6].title}</h3>
            <UdpForm handleSubmit={handleSubmit}/>
            <BackButton/>
        </Paper>
    );
};

export default UdpFormPage;