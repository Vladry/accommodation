import api from "../../lib/API";
import {setAuthToken, setRefreshToken} from "../../utils/tokens";
import {LOGIN_FAILURE, LOGIN_SUCCESS, TOGGLE_LOGIN} from "../types";

export const register = (userData) => async (dispatch) => {

}

export const toggleLogin = ({isLoggedIn, token}) => async (dispatch) => {
    dispatch({type: TOGGLE_LOGIN, payload: {isLoggedIn, token}})
}

export const login = (userData) => (dispatch) => {
    setAuthToken();
    setRefreshToken();
    api.post('/auth/login', userData)
        .then(d => {
            setAuthToken(d.token);
            setRefreshToken(d.refreshToken);
            dispatch({type: LOGIN_SUCCESS})
        })
        .catch((err) => {
            dispatch({type: LOGIN_FAILURE});
        });
}

export const logout = (userData) => async (dispatch) => {
    const data = await api
}