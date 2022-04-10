import React from 'react';
import {userFormValidation} from "./formsValidations";
import {userFormFields} from "./userFormFields";
import FormMapper from "./FormMapper";


const UserForm = () => {

    const handleSubmit =  (values) => {
            alert(JSON.stringify(values, null, 2));
        };

    return (
        <>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >Fill in new user details<br/>Заполните данные нового пользователя</h3>
            <FormMapper fields={userFormFields} validation={userFormValidation} handleSubmit={handleSubmit}/>
        </>
    );
};

export default UserForm;