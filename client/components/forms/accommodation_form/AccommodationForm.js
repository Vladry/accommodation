import React, {useContext, useEffect, useState} from 'react';
import {accommodationFormFields} from "./accommodationFormFields";
import FormMapper from "../FormMapper";
import useAuth from "../../../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../../../context";
import types from "@/store/user/types";
import sel from "@/store/user/selectors";
import {fetchData} from "@/store/user/actions";
import {Paper} from "@mui/material";
import {useTheme} from "@mui/material/styles";


const AccommodationForm = ({accommodation, index, handleSubmit}) => {
    const user = useSelector(sel.user);
    const isAuthenticated = useAuth(true);
    const {prepareFormData} = useContext(Context);
    const formInitValues = prepareFormData(accommodationFormFields, accommodation);
    const theme = useTheme();

    if (!user) return (<h3>user is not defined in store</h3>);
    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);

    return (
        <>
            <FormMapper
                fields={accommodationFormFields}
                initValues={formInitValues}
                validation={null}
                handleSubmit={handleSubmit}/>
        </>
    );
};

export default AccommodationForm;