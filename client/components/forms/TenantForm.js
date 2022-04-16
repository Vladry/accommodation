import React from 'react';
import {tenantFormValidation} from "./formsValidations";
import {tenantFormFields} from "./tenantFormFields";
import FormMapper from "./FormMapper";


const TenantForm = ({handleSubmit}) => {

    return (
        <>
            <FormMapper fields={tenantFormFields} validation={tenantFormValidation} handleSubmit={handleSubmit}/>
        </>
    );
};

export default TenantForm;