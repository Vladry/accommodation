import React, {useEffect, useRef} from 'react';
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
import globalVariables from '../../globalVariables.json';

const UdpFormPage = () => {
    const user = useSelector(sel.user);
    const userIdRef = useRef({});
    if (user) {
        userIdRef.current = user.id
    }
    const dispatch = useDispatch();
    const router = useRouter();
    const force = useRef(false);
    force.current = !!(router.query?.force && router.query.force === "true");

    const theme = useTheme();
    const datingServiceParticipation = useSelector(sel.datingServiceParticipation);

    const handleSubmit = async (values) => {
        const userDatingProfileFormNewValues = {...values, userId: userIdRef.current};
        delete userDatingProfileFormNewValues["ageRange"];//обязательно к удалению из списка аргументов на бЭк!
        delete userDatingProfileFormNewValues["heightRange"];//обязательно к удалению из списка аргументов на бЭк!
        delete userDatingProfileFormNewValues["pictures"];
        delete userDatingProfileFormNewValues["desiredWithInterests"];
        delete userDatingProfileFormNewValues["name"];
        delete userDatingProfileFormNewValues["location"];
        delete userDatingProfileFormNewValues["lastVisit"];
        delete userDatingProfileFormNewValues["age"];

         //
        // if (typeof (userDatingProfileFormNewValues["myGoals"]) === 'string') {
        //     userDatingProfileFormNewValues["myGoals"] = userDatingProfileFormNewValues["myGoals"].split(" ").join("").split(",");
        // } else if (Array.isArray(userDatingProfileFormNewValues["myGoals"])) {
        //     // console.log(`userDatingProfileFormNewValues["myGoals"]: `, userDatingProfileFormNewValues["myGoals"]);
        // }
        //
        // if (typeof (userDatingProfileFormNewValues["myInterests"]) === 'string') {
        //     userDatingProfileFormNewValues["myInterests"] = userDatingProfileFormNewValues["myInterests"].split(" ").join("").split(",");
        // } else if (Array.isArray(userDatingProfileFormNewValues["myInterests"])) {
        //     // console.log(`userDatingProfileFormNewValues["myInterests"]: `, userDatingProfileFormNewValues["myInterests"]);
        // }

        const baseURL = "http://localhost:8000/api/v1";
        // await api.post(baseURL+urls.datingProfile, userDatingProfileFormNewValues,


        await axios.post(baseURL + urls.datingProfile, userDatingProfileFormNewValues,
            {
                headers: {'datingServiceParticipation': datingServiceParticipation} //если еще не зарегистрирован в знакомствах-то, на бЭке по datingServiceParticipation=false запустится регистрация
            }
        ).then((res) => {
            // console.log('in handleSubmit.then на фронте, после отправки на Back-End данных. Ответ сервера:', res); // вывод userDatingProfile
            //обновить в локальном сторе userDatingProfile
            if (res != null) {
                // console.log("fetched userDatingProfile. res: ", res);
                //записывать в state лучше не ответ сервера, а отправляемые данные, т.к. сервер возвращает birthday в стандартном (не подходящем мне) формате -будет ошибка!
                dispatch({type: types.SET_USER_DATING_PROFILE_SUCCESS, payload: userDatingProfileFormNewValues});
                if (!datingServiceParticipation) {
                    dispatch({type: types.SET_TRUE_DATING_SERVICE_PARTICIPATION});
                }
            } else {
                console.log("error getting&dispatching updated userDatingProfile!. The store continues holding the old version of userDatingProfile (if any)");
            }
            let timer = setTimeout(() => {
                router.push(`${urls.hostPrefix}${urls.dating}`).then();//переадресовываем с задержкой, чтобы в стейте успел появиться datingServiceParticipation
                clearTimeout(timer);
            }, globalVariables.reduxTimerUpdateMilliseconds);//TODO следить, достаточно ли этих ms для отработки стейта при записи datingServiceParticipation


        })
            .catch(err => {
                console.log(err);
                console.log(`in api.post(${urls.datingProfile}).then: ошибка фронта отправки данных формы userDatingProfile`);
            });
    };


    const title = force.current? datingMenu[6].notRegistered : datingMenu[6].title;

    return (
        <Paper sx={{
            border: '1px solid green',
            ...theme.paperProps
        }}>
            <h3 className={classes['header']}>{title}</h3>

            <UdpForm handleSubmit={handleSubmit}/>
            <BackButton/>
        </Paper>
    );
};

export default UdpFormPage;