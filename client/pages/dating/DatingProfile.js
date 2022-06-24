import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";
import FormMapper from "../../components/forms/FormMapper";
import {datingUserProfileFormFields} from "../../components/forms/datingUserProfileFormFields";
import act from "../../store/types";
import {Context} from '../../context';


const DatingProfile = ({handleSubmit}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userData.user);
    const isAuthenticated = useAuth(true);
    const datingUserProfile = useSelector((state) => state.userData.datingUserProfile);
    const [isRenderFormikFormAllowed, setIsRenderFormikFormAllowed] = useState(false);
    const {prepareFormData, fetchInitFormValues} = useContext(Context);
    const formInitValues = prepareFormData(datingUserProfileFormFields, datingUserProfile);

    useEffect(
        () => {
            if (!user) return;
            const datingUserProfileURL = `/users/${user.id}/datingProfile`;
            const actionType = act.SET_DATING_USER_PROFILE;
            const callback = ()=> setIsRenderFormikFormAllowed(true);

            !datingUserProfile && fetchInitFormValues(datingUserProfileURL, actionType, callback, dispatch);
        }, [user]
    );

    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user's not defined in store</h3>);


    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >DatingProfile</h3>
            {isRenderFormikFormAllowed && <FormMapper
                fields={datingUserProfileFormFields}
                initValues={formInitValues}
                validation={null}
                handleSubmit={handleSubmit}/>}
        </div>
    );
};

export default DatingProfile;