import React, {useState} from 'react'
import {Grid, Paper, Avatar, TextField, Button, Typography, Link, Box} from '@mui/material'
import {signIn} from "next-auth/react";
import {LockOutlined} from "@mui/icons-material";
import styled from '@emotion/styled'
import Router, {useRouter} from 'next/router'

const MyPaper = styled(Paper)`
    padding: 15px 20px;
    width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
`;

const MyTextField = styled(TextField)`
    margin: 0 0 15px 0;
`;

const Login = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: 'vlad@ukr.net',
        password: '1Vlad__@'
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = async () => {
        console.log("in handleLogin->")
        if (formData.email && formData.password) {
            const result = await signIn('credentials', {redirect: false, ...formData});
            if (result.error) {
                setError(result.error || '')
            } else if (router.query.redirectUrl) {

                await Router.push({
                    pathname: router.query.redirectUrl,
                });

            } else {
                console.log("loginResult: ", result);
                await Router.push('/');
            }
            // Router.reload(); // -без перезагрузки не обновляется user в store в store->userData.user.id при переходе на след.стр.
        }
    }

    return (
        <Grid container>

            <MyPaper elevation={10}>

                <Grid align='center'>
                    <div style={{margin: '20px auto'}} ><Link href={"/"}>Homepage</Link></div>
                    <Avatar><LockOutlined/></Avatar>
                    <h2>Sign In</h2>

                    <button onClick={() => signIn("google")}>Sign in with Google</button>

                </Grid>
                <MyTextField onChange={handleChange} value={formData.email} name="email" label='Email' placeholder='Enter email' fullWidth required/>
                <MyTextField onChange={handleChange} value={formData.password} name="password" label='Password' placeholder='Enter password' type='password' fullWidth required/>

                {error && <Typography sx={{color: 'red'}}>{error}</Typography>}

                <Button sx={{marginBottom: '15px', marginTop: '10px'}} onClick={handleLogin} type='submit' color='primary' variant="contained" fullWidth>Sign in</Button>
{/*                <Typography>
                    <Link href="#">
                        Forgot password?
                    </Link>
                </Typography>*/}
                <Typography>Not Registered? -
                    <Link href={"/register"}>
                        &nbsp;Register/Регистрация
                    </Link>

                </Typography>

            </MyPaper>
        </Grid>
    );
};

export default Login;