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
    const user = useSelector(selectors.user);
    const isAuthenticated = useAuth(true);
    const userDatingProfile = useSelector(selectors.userDatingProfile);
    const [isRenderFormikFormAllowed, setIsRenderFormikFormAllowed] = useState(false);
    const {prepareFormData} = useContext(Context);
    const formInitValues = prepareFormData(userDatingProfileFormFields, userDatingProfile);

    useEffect(
        () => {
            if (!user) return;
            const userDatingProfileURL = `/users/${user.id}/datingProfile`;
            const callback = () => setIsRenderFormikFormAllowed(true);
            if(userDatingProfile){setIsRenderFormikFormAllowed(()=>true)}

            // TODO потом возможно подключить опцию дополнительного вытаскивания userDatingProfile, если его еще нет
            /*!userDatingProfile && fetchData(userDatingProfileURL, types.GET_USER_DATING_PROFILE,
                types.SET_USER_DATING_PROFILE_SUCCESS, types.SET_USER_DATING_PROFILE_FAIL, callback, dispatch);*/
        }, [user, userDatingProfile]
    );

    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user is not defined in store</h3>);


    return (
        <div>
            {!userDatingProfile && <p>Вы ещё не зарегистрированы в службе знакомств!  Заполните ваш новый профайл. На его основании, для Вас будут предложены кандидаты, соответствующие Вашим пожеланиям:</p>}
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