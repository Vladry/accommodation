import api from '../lib/API';

console.log("in tokens.js");
export const getTokens = () => {
    if (typeof window !== "undefined") {
        return {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken')
        };
    }
    return {}
};

export const setAuthToken = (token) => {
    console.log("in setAuthToken = (token) =>")
    if (typeof window !== "undefined") {
        if (token) {
            api.defaults.headers.common.Authorization = `${token}`;
            localStorage.setItem('accessToken', token);
        } else {
            delete api.defaults.headers.common.Authorization;
            localStorage.removeItem('accessToken');
        }
    }
};

export const setRefreshToken = (token) => {
    console.log("in setRefreshToken = (token) =>")
        if (typeof window !== "undefined") {
            if (token) {
                localStorage.setItem('refreshToken', token);
            } else {
                localStorage.removeItem('refreshToken');
            }
        }
    }
;