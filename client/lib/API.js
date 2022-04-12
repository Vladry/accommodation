import axios from "axios"
import {getTokens, setAuthToken, setRefreshToken} from "../utils/tokens";
import {getSession} from "next-auth/react";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
})

// https://axios-http.com/docs/interceptors
api.interceptors.request.use(async (rq) => {
    const session = await getSession();

    if (!!session) {
        rq.headers = {
            'Authorization': session.accessToken,
            'Content-Type': 'application/json'
        }
    }
    return rq;
}, error => {
    Promise.reject(error)
})

api.interceptors.response.use(
    (response) => response.data,
    // async function (error) {
    //     const {refreshToken} = getTokens()
    //     const originalRequest = error.config
    //
    //     // eslint-disable-next-line no-underscore-dangle
    //     // if (error.response.status === 401 && !originalRequest._retry) {
    //     //     // eslint-disable-next-line no-underscore-dangle
    //     //     originalRequest._retry = true
    //     //
    //     //     // eslint-disable-next-line no-return-await
    //     //     return await axios
    //     //         .get("/api/v1/auth/refresh", {
    //     //             headers: {
    //     //                 "Refresh-token": refreshToken,
    //     //             },
    //     //         })
    //     //         .then(({data}) => {
    //     //             setAuthToken(data.jwt)
    //     //             setRefreshToken(data.refreshToken)
    //     //             originalRequest.headers.Authorizaition = data.jwt
    //     //             return api(originalRequest)
    //     //         })
    //     // }
    //
    //     return Promise.reject(error)
    // }
)

export default api
