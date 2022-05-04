import React from 'react';
import {userFormValidation} from "./formsValidations";
import {userFormFields} from "./userFormFields";
import FormMapper from "./FormMapper";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import {useRouter} from "next/router";


const UserForm = ({handleSubmit}) => {
    const router = useRouter();

    return (
        <>
            <Box textAlign={'center'}><Button variant={'outlined'} color={'primary'} size={'small'}
            onClick={() => router.back()}> Go Back/ Вернуться Обратно</Button></Box>
            <FormMapper fields={userFormFields} validation={null} handleSubmit={handleSubmit}/>
            {/* TODO <FormMapper fields={userFormFields} validation={userFormValidation} handleSubmit={handleSubmit}/>*/}
        </>
    );
};

export default UserForm;