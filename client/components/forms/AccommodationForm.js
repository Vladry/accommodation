import React, {useState} from 'react';
import {accommodationFormValidation} from "./formsValidations";
import {accommodationFormFields} from "./accommodationFormFields";
import FormMapper from "./FormMapper";
import api from "../../lib/API";
import useAuth from "../../hooks/useAuth";
import {useSelector} from "react-redux";


const AccommodationForm = () => {
    const [userId, setUserId] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const isAuthenticated = useAuth(true);
    const profile = useSelector(state => state.userData.user);


    const handleSubmit = async (values) => {
        alert(JSON.stringify(values));
        await api.post("/accommodations",
            JSON.stringify(values)).then(
            r => alert(JSON.stringify(r, null, 2))
        ).then(()=> fetchAccommodations(userId))
            .catch(err => {
                console.log(err)
            });
    };
    const fetchAccommodations = async (userId)=>{
        api.post(`/accommodations/${userId}`, null)
            .then(r=>alert(JSON.stringify(r, null, 2)))
    }


    return (
        <>
            <h3 style={{textAlign: 'center', marginTop: '10px'}}
            >Accommodation Details<br/>Информация о предлагаемом жилье</h3>
            <FormMapper fields={accommodationFormFields} validation={null}

                        handleSubmit={handleSubmit}/>
        </>
    );
};

export default AccommodationForm;