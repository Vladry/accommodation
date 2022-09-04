import React, {useContext, useEffect, useState} from 'react';
import {accommodationFormFields} from "./accommodationFormFields";
import FormMapper from "../FormMapper";
import useAuth from "../../../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../../../context";
import types from "../../../store/types";
import sel from "../../../store/selectors";
import {fetchData} from "../../../store/actions/userAction";


const AccommodationForm = ({handleSubmit}) => {
    const dispatch = useDispatch();
    const user = useSelector(sel.user);
    const isAuthenticated = useAuth(true);
    const accommodationUserProfile = useSelector(sel.accommodationUserProfile);
    const [isRenderFormikFormAllowed, setIsRenderFormikFormAllowed] = useState(false);
    const {prepareFormData} = useContext(Context);
    const formInitValues = prepareFormData(accommodationFormFields, accommodationUserProfile);

    useEffect(
        () => {
            if (!user) return;
            const accommodationUserProfileURL = `/accommodations/${user.id}`;
            const callback = () => setIsRenderFormikFormAllowed(true);
            !accommodationUserProfile && dispatch(fetchData(user.id, accommodationUserProfileURL, types.GET_ACCOMMODATION_USER_PROFILE, types.SET_ACCOMMODATION_USER_PROFILE_SUCCESS, types.SET_ACCOMMODATION_USER_PROFILE_FAIL, callback));
        }, []
    );

    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user is not defined in store</h3>);


    return (
        <>
            {isRenderFormikFormAllowed && <FormMapper
                fields={accommodationFormFields}
                initValues={formInitValues}
                validation={null}
                handleSubmit={handleSubmit}/>}
        </>
    );
};

export default AccommodationForm;