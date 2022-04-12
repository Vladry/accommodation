import React from 'react';
import {userFormValidation} from "./formsValidations";
import {userFormFields} from "./userFormFields";
import FormMapper from "./FormMapper";
import config from "../../config.json";
import axios from "axios";

const UserForm = () => {

    const handleSubmit = async (values) => {

        await axios.post("/api/v1/users",
        // await axios.post(config.users.requestMapping,
            JSON.stringify(values)).then(
            r => alert(JSON.stringify(r, null, 2))
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