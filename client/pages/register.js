import React, {useState} from 'react';
import api from "../lib/API";
import NewUserForm from "../components/forms/user_form/NewUserForm";
import Router from "next/router";
import {signIn} from "next-auth/react";
import {Box, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {useTheme} from "@mui/material/styles";
import types from "@/store/user/types";
import {useDispatch} from "react-redux";

const Register = () => {

        const [error, setError] = useState(false);
        const theme = useTheme();
        const dispatch = useDispatch();

        const errorBox = (
            <Box margin={'0 auto'}>
                <ErrorBox color={{color: theme.palette.error.main}}>
                    <Typography variant={'subtitle1'}>user with this email or password already
                        exists!<br/>
                        Пользователь с таким имейлом или паролем уже существует!</Typography>
                </ErrorBox>
                <ErrorBox color={{color: theme.palette.primary.main}}>
                    <Typography variant={'body1'}>Amend your data and try
                        register again<br/>
                        Скорректируйте данные и повторите регистрацию</Typography>
                </ErrorBox>
            </Box>
        );


        const handleSubmit = async (values) => {
            // console.log("values: ", values);
            try {
                await api.post("/auth/register", values)
                    .then(r => {
                        values.id = r.userId;
                        dispatch({type: types.SET_USER_SUCCESS, payload: values});
                    });


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

                <NewUserForm handleSubmit={handleSubmit}/>
            </>
        );
    }
;

export default Register;


const ErrorBox = styled('p')(
    ({color}) => ({
        color: color.color,
        margin: '10px auto',
        textAlign: 'center'
    })
);
