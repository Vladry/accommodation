import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../../../lib/API";
import {signIn} from "next-auth/react";
import {setUserId} from '@/store/user/actions.js';

const API_URL = "http://localhost:8000/api/v1"
console.log("in [..nextauth].js");
// https://arunoda.me/blog/add-auth-support-to-a-next-js-app-with-a-custom-backend
export async function handleRegister(registerData) {
    try {
        const registrationResponse = await api.post(API_URL + '/auth/register', {
            email: registerData.email,
            password: registerData.password
        });

        await signIn('credentials', registerData);
    } catch (error) {
        return {
            ...registerData,
            error: "RegistrationError",
        }
    }
}

async function refreshAccessToken(tokenObject) {
    try {

        console.log("Trying to refresh token")
        // Get a new set of tokens with a refreshToken
        const tokenResponse = await api.get(API_URL + '/auth/refresh', {
            headers: {
                "Refresh-token": tokenObject.refreshToken
            }
        });

        return {
            ...tokenObject,
            accessToken: tokenResponse.token,
            accessTokenExpiry: tokenResponse.tokenExpiry,
            refreshToken: tokenResponse.refreshToken
        }
    } catch (error) {
        return {
            ...tokenObject,
            error: "RefreshAccessTokenError",
        }
    }
}

const providers = [
    CredentialsProvider({
        name: 'Credentials',
        authorize: async (credentials) => {
            console.log('in Credentials Provider!');
            try {
                // Authenticate user with credentials
                const user = await axios.post(API_URL + '/auth/login', {
                    email: credentials.email,
                    password: credentials.password
                });

                if (user.data.token) {
                    console.log("user.data: " + user.data);
                    // console.log("user.data.userId: " + user.data.userId);
                    setUserId(user.data.userId);
                    return user.data;
                }
                console.log("user.data.userId: " + user.data.userId);

                return null;
            } catch (e) {
                throw new Error("Login or password is not correct");
            }
        }
    })
]

const callbacks = {
    jwt: async ({token, user}) => {
        if (user) {
            // console.log(user);
            token.accessToken = user.token;
            token.accessTokenExpiry = user.tokenExpiry;
            token.refreshToken = user.refreshToken;
        }

        // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
        const shouldRefreshTime = Math.round((token.accessTokenExpiry - 60 * 60 * 1000) - Date.now());

        // If the token is still valid, just return it.
        if (shouldRefreshTime > 0) {
            return Promise.resolve(token);
        }

        // If the call arrives after 23 hours have passed, we allow to refresh the token.
        token = refreshAccessToken(token);
        return Promise.resolve(token);
    },
    session: async ({session, token}) => {
        // Here we pass accessToken to the client to be used in authentication with your API
        session.accessToken = token.accessToken;
        session.accessTokenExpiry = token.accessTokenExpiry;
        session.error = token.error;

        return Promise.resolve(session);
    },
}

export const options = {
    providers,
    callbacks,
    pages: {},
    secret: 'FSUNIWNnf28dodD82qd'
}

const Auth = (req, res) => NextAuth(req, res, options)
export default Auth;