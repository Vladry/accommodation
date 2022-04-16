import api from "../../lib/API";
import {getSession} from "next-auth/react";
import {GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS} from "../types";

export const getProfile = () => (dispatch) => {
    dispatch({type: GET_PROFILE_REQUEST})
    api.get('/users/profile')
        .then(d => {
            dispatch({type: GET_PROFILE_SUCCESS, payload: {user: d}})
        }).catch(e => {
        dispatch({type: GET_PROFILE_FAILURE})
        console.log(e);
    });
}
