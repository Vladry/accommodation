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

/*
возможные варианты аргументов для getDatingProfile:

const logActionCurrentU =   act.GET_USER_DATING_PROFILE;
const setActionCurrentU =   act.SET_USER_DATING_PROFILE;
const logActionCandidateU = act.GET_CANDIDATE_DATING_PROFILE;
const setActionCandidateU = act.SET_CANDIDATE_DATING_PROFILE;
*/
export const getDatingProfile = (userId, logAction, setAction) =>(dispatch)=>{
    dispatch({type: logAction, payload: userId});
    const url = `/users/${userId}/datingProfile`;
    api.get(url).then(d_u_Profile=>{
        dispatch({type: setAction, payload: d_u_Profile});
    })
        .catch(err => {
            console.log(err)
        });
}


