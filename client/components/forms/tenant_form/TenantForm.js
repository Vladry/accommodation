import React, {useContext, useEffect, useState} from 'react';
import {tenantFormValidation} from "../user_form/formsValidations";
import {tenantFormFields} from "./tenantFormFields";
import FormMapper from "../FormMapper";
import types from "../../../store/types";
import {useDispatch, useSelector} from "react-redux";
import sel from "../../../store/selectors";
import useAuth from "../../../hooks/useAuth";
import {Context} from "../../../context";
import {accommodationFormFields} from "../accommodation_form/accommodationFormFields";


const TenantForm = ({handleSubmit}) => {
    /*
        const dispatch = useDispatch();
        const user = useSelector(sel.user);
        const isAuthenticated = useAuth(true);
        const tenantUserProfile = useSelector(sel.tenantUserProfile);
        const [isRenderFormikFormAllowed, setIsRenderFormikFormAllowed] = useState(false);
        const {prepareFormData, fetchInitFormValues} = useContext(Context);
        const formInitValues = prepareFormData(tenantFormFields, tenantUserProfile);

        useEffect(
            () => {
                if (!user) return;
                const tenantUserProfileURL = `/tenants/${user.id}`;
                const callback = () => setIsRenderFormikFormAllowed(true);
                !accommodationUserProfile && fetchInitFormValues(tenantUserProfileURL, types.GET_TENANT_USER_PROFILE, types.SET_TENANT_USER_PROFILE_SUCCESS, types.SET_TENANT_USER_PROFILE_FAIL, callback, dispatch);
            }, [user]
        );
    */


    return (
        <>
            <FormMapper fields={tenantFormFields}
                        persistedValues={null}
                        validation={tenantFormValidation}
                        handleSubmit={handleSubmit}/>
        </>
    );
};

export default TenantForm;