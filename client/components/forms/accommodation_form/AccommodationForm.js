import React, {useContext, useEffect, useState} from 'react';
import {accommodationFormFields} from "./accommodationFormFields";
import FormMapper from "../FormMapper";
import useAuth from "../../../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../../../context";
import types from "../../../store/types";
import sel from "../../../store/selectors";
import {fetchData} from "../../../store/actions/userAction";


const AccommodationForm = ({accommodation, key, handleSubmit}) => {
    const user = useSelector(sel.user);
    const isAuthenticated = useAuth(true);
    const {prepareFormData} = useContext(Context);
    const formInitValues = prepareFormData(accommodationFormFields, accommodation);

    if (!user) return (<h3>user is not defined in store</h3>);
    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);

    return (
        <div key={key} style={{border: '1px solid red'}}>
            <FormMapper
                fields={accommodationFormFields}
                initValues={formInitValues}
                validation={null}
                handleSubmit={handleSubmit}/>
        </div>
    );
};

export default AccommodationForm;