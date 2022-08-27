import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useAuth from "../../../hooks/useAuth";
import FormMapper from "../FormMapper";
import {userDatingProfileFormFields} from "./userDatingProfileFormFields";
import act from "../../../store/types";
import {Context} from '../../../context';


const UserDatingProfileForm = ({handleSubmit}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userData.user);
    const isAuthenticated = useAuth(true);
    const userDatingProfile = useSelector((state) => state.userData.userDatingProfile);
    const [isRenderFormikFormAllowed, setIsRenderFormikFormAllowed] = useState(false);
    const {prepareFormData, fetchInitFormValues} = useContext(Context);
    const formInitValues = prepareFormData(userDatingProfileFormFields, userDatingProfile);

    useEffect(
        () => {
            if (!user) return;
            const userDatingProfileURL = `/users/${user.id}/datingProfile`;
            const actionType = act.SET_DATING_USER_PROFILE;
            const callback = ()=> setIsRenderFormikFormAllowed(true);

            !userDatingProfile && fetchInitFormValues(userDatingProfileURL, actionType, callback, dispatch);
        }, [user]
    );

    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user is not defined in store</h3>);


    return (
        <div>
            {isRenderFormikFormAllowed && <FormMapper
                fields={userDatingProfileFormFields}
                initValues={formInitValues}
                validation={null}
                handleSubmit={handleSubmit}/>}
        </div>
    );
};

export default UserDatingProfileForm;