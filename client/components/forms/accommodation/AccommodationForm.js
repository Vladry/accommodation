import React, {useContext, useEffect, useState} from 'react';
import {accommodationFormFields} from "./accommodationFormFields";
import FormMapper from "../FormMapper";
import useAuth from "../../../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../../../context";
import act from "../../../store/types";


const AccommodationForm = ({handleSubmit}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userData.user);
    const isAuthenticated = useAuth(true);
    const accommodationUserProfile = useSelector((state) => state.userData.accommodationUserProfile);
    const [isRenderFormikFormAllowed, setIsRenderFormikFormAllowed] = useState(false);
    const {prepareFormData, fetchInitFormValues} = useContext(Context);
    const formInitValues = prepareFormData(accommodationFormFields, accommodationUserProfile);

    useEffect(
        () => {
            if (!user) return;
            const accommodationUserProfileURL = `/accommodations/${user.id}`;
            const actionType = act.SET_ACCOMMODATION_USER_PROFILE;
            const callback = ()=> setIsRenderFormikFormAllowed(true);

            !accommodationUserProfile && fetchInitFormValues(accommodationUserProfileURL, actionType, callback, dispatch);
        }, [user]
    );

    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user's not defined in store</h3>);



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