import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useAuth from "../../../hooks/useAuth";
import FormMapper from "../FormMapper";
import {userDatingProfileFormFields} from "./userDatingProfileFormFields";
import act from "../../../store/types";
import {Context} from '../../../context';
import types from "../../../store/types";
import selectors from "../../../store/selectors";


const UserDatingProfileForm = ({handleSubmit}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectors.user);
    const isAuthenticated = useAuth(true);
    const userDatingProfile = useSelector(selectors.currUserDatingProfile);
    const [isRenderFormikFormAllowed, setIsRenderFormikFormAllowed] = useState(false);
    const {prepareFormData, fetchInitFormValues} = useContext(Context);
    const formInitValues = prepareFormData(userDatingProfileFormFields, userDatingProfile);

    useEffect(
        () => {
            if (!user) return;
            const userDatingProfileURL = `/users/${user.id}/datingProfile`;
            const callback = () => setIsRenderFormikFormAllowed(true);
            // если нет userDatingProfile, попробуем еще раз его получить (хотя он должен быть сразу после входа в систему!)
            !userDatingProfile && fetchInitFormValues(userDatingProfileURL, types.GET_USER_DATING_PROFILE,
                types.SET_USER_DATING_PROFILE_SUCCESS, types.SET_USER_DATING_PROFILE_FAIL, callback, dispatch);
        }, [user]
    );

    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user is not defined in store</h3>);


    return (
        <div>
            {isRenderFormikFormAllowed &&
                <FormMapper
                fields={userDatingProfileFormFields}
                initValues={formInitValues}
                validation={null}
                handleSubmit={handleSubmit}/>}
        </div>
    );
};

export default UserDatingProfileForm;