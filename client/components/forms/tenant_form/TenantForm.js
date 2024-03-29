import React, {useContext, useEffect, useState} from 'react';
import {tenantFormValidation} from "../user_form/formsValidations";
import {tenantFormFields} from "./tenantFormFields";
import FormMapper from "../FormMapper";
import types from "@/store/user/types";
import {useDispatch, useSelector} from "react-redux";
import sel from "@/store/user/selectors";
import useAuth from "../../../hooks/useAuth";
import {Context} from "@/root/context.js";
import {accommodationFormFields} from "../accommodation_form/accommodationFormFields";


const TenantForm = ({handleSubmit}) => {

        const dispatch = useDispatch();
        const user = useSelector(sel.user);
        const isAuthenticated = useAuth(true);
        const tenantUserProfile = useSelector(sel.tenantUserProfile);
        const [isRenderFormikFormAllowed, setIsRenderFormikFormAllowed] = useState(false);
        const {prepareFormData, fetchData} = useContext(Context);
        const formInitValues = prepareFormData(tenantFormFields, tenantUserProfile);


    /*
    useEffect(
        () => {
            if (!user) return;
            const tenantUserProfileURL = `/tenants/${user.id}`;
            const callback = () => setIsRenderFormikFormAllowed(true);
            !accommodationUserProfiles && fetchData(tenantUserProfileURL, datingChatsTypes.GET_TENANT_USER_PROFILE, datingChatsTypes.SET_TENANT_USER_PROFILE_SUCCESS, datingChatsTypes.SET_TENANT_USER_PROFILE_FAIL, callback, dispatch);
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