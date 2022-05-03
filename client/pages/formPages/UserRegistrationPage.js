import React, {useState} from 'react';
import api from "../../lib/API";
import UserForm from "../../components/forms/UserForm";
import Router from "next/router";
import {signIn} from "next-auth/react";
import {Box, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {useTheme} from "@mui/material/styles";

const UserRegistrationPage = () => {

        const [error, setError] = useState(false);
        const theme = useTheme();

        const errorBox = (
            <Box sx={{m: '0 auto'}}>
                <ErrorBox theme={{color: theme.palette.error.main}}>
                    <Typography variant={'subtitle1'}>user with this email or password already
                        exists!<br/>
                        Пользователь с таким имейлом или паролем уже существует!</Typography>
                </ErrorBox>
                <ErrorBox theme={{color: theme.palette.primary.main}}>
                    <Typography variant={'body1'}>Amend your data and try
                        register again<br/>
                        Скорректируйте данные и повторите регистрацию</Typography>
                </ErrorBox>
            </Box>
        );


        const handleSubmit = async (values) => {

            try {
                await api.post("/auth/registerFullUser", values);

                setError(false);
                const {email, password} = values;
                await signIn('credentials', {redirect: false, email, password});
                await Router.push("/");

            } catch {
                console.log('such user already exists! ');
                setError(true);
            }


        };


        return (
            <>


                <h3 style={{textAlign: 'center', marginTop: '10px'}}
                >Fill in new user details<br/>Заполните данные нового пользователя</h3>

                {error && errorBox}

                <UserForm handleSubmit={handleSubmit}/>
            </>
        );
    }
;

export default UserRegistrationPage;


const ErrorBox = styled('p')(
    ({theme}) => ({
        color: theme.color,
        margin: '10px auto',
        textAlign: 'center'
    })
);
