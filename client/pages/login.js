import React, {useState} from 'react'
import {Grid, Paper, Avatar, TextField, Button, Typography, Link} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from "@material-ui/core/styles";
import {signIn} from "next-auth/react";

const useStyles = makeStyles(() => ({
    paperStyle: {
        padding: 20,
        width: '320px',
        margin: "20px auto"
    },
    avatarStyle: {
        backgroundColor: '#1bbd7e'
    },
    btnStyle: {
        margin: '8px 0'
    }
}));

const Login = () => {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = () => {
        if (formData.email && formData.password) {
            signIn('credentials', formData);
        }
    }

    return (
        <Grid container>
            <Paper elevation={10} className={classes.paperStyle}>
                <Grid align='center'>
                    <Avatar className={classes.avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField onChange={handleChange} name="email" label='Email' placeholder='Enter email' fullWidth required/>
                <TextField onChange={handleChange} name="password" label='Password' placeholder='Enter password' type='password' fullWidth required/>

                <Button onClick={handleLogin} type='submit' color='primary' variant="contained" className={classes.btnStyle} fullWidth>Sign in</Button>
                <Typography>
                    <Link href="#">
                        Forgot password?
                    </Link>
                </Typography>
                <Typography>Do you have an account?
                    <Link href="#">
                        &nbsp;Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Login;