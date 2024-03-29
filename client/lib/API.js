import axios from "axios"
import {getTokens, setAuthToken, setRefreshToken} from "@/utils/tokens";
import {getSession} from "next-auth/react";
console.log("in API.js");

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
});

api.interceptors.request.use(
    async (rq) => {    // https://axios-http.com/docs/interceptors
    const session = await getSession();
console.log("in API.interceptors.request->  getSession(), session: ", session)
    if (!!session) {
        rq.headers = {
            'Authorization': session.accessToken,
            'Content-Type': 'application/json'
        }
    }
    console.log("session: ", session);
    return rq;
}, error => {
    Promise.reject(false)
})

api.interceptors.response.use(
    (response) => {
        console.log("in API.interceptors.response->  ");
        return response.data;
    },
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
