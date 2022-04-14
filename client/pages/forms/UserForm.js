import React from 'react';
import {userFormValidation} from "./formsValidations";
import {userFormFields} from "./userFormFields";
import FormMapper from "./FormMapper";
import api from "../../lib/API";

const UserForm = () => {


        const handleSubmit = async (values) => {
            alert(JSON.stringify(values));
            await api.post("/auth/registerFullUser",
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                }
            ).then(
                r => {
                }
            )
                .catch(err => {
                    console.log(err)
                });
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