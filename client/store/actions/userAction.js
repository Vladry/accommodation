import api from "../../lib/API";
import act from "../types";

export const getProfile = () => (dispatch) => {
    dispatch({type: act.GET_PROFILE_REQUEST});
    api.get('/users/profile')
        .then(d => {
            dispatch({type: act.GET_PROFILE_SUCCESS, payload: {user: d}})
        }).catch(e => {
        dispatch({type: act.GET_PROFILE_FAILURE})
        console.log(e);
    });
}


