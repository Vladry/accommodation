import React from 'react';
import {userFormValidation} from "./formsValidations";
import {userFormFields} from "./userFormFields";
import FormMapper from "./FormMapper";


const UserForm = ({handleSubmit}) => {

    return (
        <>
            <FormMapper fields={userFormFields} validation={userFormValidation} handleSubmit={handleSubmit}/>
        </>
    );
};

export default UserForm;