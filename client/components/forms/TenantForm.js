import React from 'react';
import {tenantFormValidation} from "./formsValidations";
import {tenantFormFields} from "./tenantFormFields";
import FormMapper from "./FormMapper";


const TenantForm = ({handleSubmit}) => {

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