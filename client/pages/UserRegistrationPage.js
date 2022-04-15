import React from 'react';
import api from "../lib/API";
import UserForm from "../components/forms/UserForm";

const UserRegistrationPage = () => {


        const handleSubmit = async (values) => {
            await api.post("/auth/registerFullUser", values).then(
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


            <UserForm handleSubmit={handleSubmit}/>
        </>
    );
};

export default UserRegistrationPage;