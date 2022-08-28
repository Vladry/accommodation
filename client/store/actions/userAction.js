import api from "../../lib/API";
import types from "../types";

export const getUser = () => (dispatch) => {
    dispatch({type: types.SET_LOADING_TRUE});
    api.get('/users/profile')
        .then(user => {
            // console.log("user found in DB: ", user);
            dispatch({type: types.SET_USER_SUCCESS, payload: user})
        }).catch(e => {
        dispatch({type: types.SET_USER_FAILURE})
        console.log(e);
    });
}

/*
возможные варианты аргументов для getDatingProfile:

const logActionCurrentU =   types.GET_USER_DATING_PROFILE;
const setActionCurrentU =   types.SET_USER_DATING_PROFILE;
const logActionCandidateU = types.GET_CANDIDATE_DATING_PROFILE;
const setActionCandidateU = types.SET_CANDIDATE_DATING_PROFILE;
*/
export const getDatingProfile = (userId, logAction, setAction) =>(dispatch)=>{
    dispatch({type: logAction});
    const url = `/users/${userId}/datingProfile`;

    api.get(url).then(d_u_Profile=>{
        dispatch({type: setAction, payload: d_u_Profile});
    })
        .catch(err => {
            console.log(err)
            console.log("error fetching userDatingProfile for user id: ", userId);
            dispatch({type: setAction, payload: null});
        });
}


