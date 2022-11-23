import React, {useContext} from 'react';
import {userFormValidation} from "./formsValidations";
import {newUserFormFields} from "./newUserFormFields";
import FormMapper from "../FormMapper";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import {useRouter} from "next/router";
import {Context} from "../../../context";
import {searchCriteriaFields} from "../dating_user_profile_form/searchCriteriaFields";


const NewUserForm = ({handleSubmit}) => {
    const router = useRouter();
    const {prepareFormData} = useContext(Context);
    const formInitValues = prepareFormData(newUserFormFields, null);


    return (
        <>
            <Box textAlign={'center'}><Button variant={'outlined'} color={'primary'} size={'small'}
            onClick={() => router.back()}> Go Back/ Вернуться Обратно</Button></Box>
            <FormMapper fields={newUserFormFields}
                        initValues={formInitValues}
                        validation={null}
                        handleSubmit={handleSubmit}/>
        </>
    );
};

export default NewUserForm;