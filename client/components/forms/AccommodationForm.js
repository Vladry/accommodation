import React from 'react';
import {accommodationFormValidation} from "./formsValidations";
import {accommodationFormFields} from "./accommodationFormFields";
import FormMapper from "./FormMapper";


const AccommodationForm = () => {

    const handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >Accommodation Details<br/>Информация о предлагаемом жилье</h3>
            <FormMapper fields={accommodationFormFields} validation={accommodationFormValidation}
                        handleSubmit={handleSubmit}/>
        </>
    );
};

export default AccommodationForm;