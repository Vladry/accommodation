import React, {useRef} from 'react';
import {datingMenu} from "../../public/menuConfig";
import {useDispatch, useSelector} from "react-redux";
import {Paper} from "@mui/material";
import sel from "@/store/user/selectors";
import types from "@/store/user/types";
import {useRouter} from "next/router";
import urls from "../../../src/main/resources/urls.json";
import axios from "axios";
import {useTheme} from "@mui/material/styles";
import BackButton from "../../components/BackButton";
import classes from '../../components/dating_components/datingMenuItems/dating.module.css';
import globalVariables from '../../globalVariables.json';
import SearchCriteriaForm from "../../components/forms/dating_user_profile_form/SearchCriteriaForm";

const SearchCriteriaFormPage = () => {
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
    const datingSearchCriteriaProfile = useSelector(sel.datingSearchCriteriaProfile);
    const id = datingSearchCriteriaProfile?.id? datingSearchCriteriaProfile.id : null;

    const handleSubmit = async (valuesFromForm) => {
        const datingSearchCriteriaProfileFormNewValues = {...valuesFromForm, userId: userIdRef.current, id: id};
        delete datingSearchCriteriaProfileFormNewValues["ageRange"];//обязательно к удалению из списка аргументов на бЭк!
        delete datingSearchCriteriaProfileFormNewValues["heightRange"];//обязательно к удалению из списка аргументов на бЭк!

        const baseURL = "http://localhost:8000/api/v1";
        // await api.post(baseURL+urls.datingSearchCriteriaProfile, userDatingProfileFormNewValues,


        await axios.post(baseURL + urls.datingSearchCriteriaProfile, datingSearchCriteriaProfileFormNewValues
        ).then((res) => {
            if (res != null) {
                dispatch({type: types.SET_USER_DATING_SEARCH_CRITERIA_PROFILE_SUCCESS, payload: res.data});
                // dispatch({type: types.SET_USER_DATING_SEARCH_CRITERIA_PROFILE_SUCCESS, payload: datingSearchCriteriaProfileFormNewValues});
            } else {
                console.log("error getting&dispatching updated datingSearchCriteriaProfile!. The store continues holding the old version of datingSearchCriteriaProfile (if any)");
            }
            let timer = setTimeout(() => {
                router.push(`${urls.hostPrefix}${urls.dating}`).then();//переадресовываем с задержкой, чтобы в стейте успел появиться datingSearchCriteriaProfile
                clearTimeout(timer);
            }, globalVariables.reduxTimerUpdateMilliseconds);//TODO следить, достаточно ли этих ms для отработки стейта при записи datingSearchCriteriaProfile


        })
            .catch(err => {
                console.log(err);
                console.log(`in api.post(${urls.datingSearchCriteriaProfile}).then: ошибка фронта отправки данных формы datingSearchCriteriaProfile`);
            });
    };


    const title = force.current? datingMenu[5].notRegistered : datingMenu[5].title;

    return (
        <Paper sx={{
            border: '1px solid green',
            ...theme.paperProps
        }}>
            <h3 className={classes['header']}>{title}</h3>

            <SearchCriteriaForm handleSubmit={handleSubmit}/>
            <BackButton/>
        </Paper>
    );
};

export default SearchCriteriaFormPage;