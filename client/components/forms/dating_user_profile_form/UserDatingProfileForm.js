import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useAuth from "../../../hooks/useAuth";
import FormMapper from "../FormMapper";
import {userDatingProfileFormFields} from "./userDatingProfileFormFields";
import act from "../../../store/types";
import {Context} from '../../../context';
import types from "../../../store/types";
import selectors from "../../../store/selectors";
import urls from '../../../../src/main/resources/urls.json'

const UserDatingProfileForm = ({handleSubmit}) => {
    const user = useSelector(selectors.user);
    const isAuthenticated = useAuth(true);
    const userDatingProfile = useSelector(selectors.userDatingProfile);
    const {prepareFormData} = useContext(Context);
    const formInitValues = prepareFormData(userDatingProfileFormFields, userDatingProfile);


    if (!isAuthenticated) return (<h3>please login/ Войтите в систему</h3>);
    if (user === null || user === undefined) return (<h3>user is not defined in store</h3>);

    return (
        <div>
            <FormMapper
                fields={userDatingProfileFormFields}
                initValues={formInitValues}
                validation={null}
                handleSubmit={handleSubmit}/>
        </div>
    );
};

export default UserDatingProfileForm;