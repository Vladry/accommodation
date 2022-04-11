import React from 'react';
import {tenantFormValidation} from "./formsValidations";
import {tenantFormFields} from "./tenantFormFields";
import FormMapper from "./FormMapper";


const TenantForm = () => {

    const handleSubmit =  (values) => {
            alert(JSON.stringify(values, null, 2));
        };

    return (
        <>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >Tenant Details<br/>Информация о семье претендента на жильё</h3>
            <FormMapper fields={tenantFormFields} validation={tenantFormValidation} handleSubmit={handleSubmit}/>
        </>
    );
};

export default TenantForm;