import api from "../../lib/API";
import types from "../types";

export const getUser = () => (dispatch) => {
    // console.log("in store-> getUser ")
    dispatch({type: types.SET_LOADING_TRUE});
    api.get('/users/profile')
        .then(user => {
            // console.log("user found in DB: ", user);
            dispatch({type: types.SET_USER_SUCCESS, payload: user});
            // console.log(`in get(/users/profile. user.id: `, user.id);
            //и сразу получим (если существует) datingProfile текущего currentUser чтобы определить его isCurrUserRegisteredInDating:
            dispatch(getDatingProfile(user.id, types.GET_USER_DATING_PROFILE, types.SET_USER_DATING_PROFILE_SUCCESS));
            // dispatch(getAccommodationProfileIfExists(user.id));
            // dispatch(getTenantProfileIfExists(user.id));
            // dispatch(getVolunteerProfileIfExists(user.id));
        }).catch(e => {
        dispatch({type: types.SET_USER_FAILURE})
        console.log("Exception in getUser -> run  dispatch({type: types.SET_USER_FAILURE})");
    });
}

/*
Т.к. getDatingProfile используется для получения getDatingProfile как для юзеров, так и для datingCandidates, то возможные варианты аргументов для :

loadingActions:   GET_USER_DATING_PROFILE,  GET_CANDIDATE_DATING_PROFILE;
targetActions:
SET_USER_DATING_PROFILE_SUCCESS;
SET_USER_DATING_PROFILE_FAILURE;
SET_CANDIDATE_DATING_PROFILE;
*/
export const getDatingProfile = (userId, loadingAction, targetAction) =>(dispatch)=>{
    // console.log(`in getDatingProfile (userId: ${userId}, logAction: ${logAction}, setAction: ${setAction})`)
    dispatch({type: loadingAction});
    const url = `/users/${userId}/datingProfile`;

    api.get(url).then(d_u_Profile=>{
        // console.log(`d_u_Profile: ${d_u_Profile}, will now dispatch it to store`)
        dispatch({type: targetAction, payload: d_u_Profile});
    })
        .catch(err => {
            console.log(err)
            console.log("error fetching userDatingProfile for user id: ", userId);
            dispatch({type: types.SET_USER_DATING_PROFILE_FAIL});
        });
}


// 3 функции ниже уже задействованы в getUser вызываемом при формировании store-a!  Может быть они и не понадобятся, т.к. буду всегда вынимать эти профайлы из БД каждый раз при редактировании этих данных
const getAccommodationProfileIfExists = (userId) => (dispatch)=> {
//TODO заполнить
}
const getTenantProfileIfExists = (userId) => (dispatch)=> {
//TODO заполнить
}
const getVolunteerProfileIfExists = (userId) => (dispatch)=> {
//TODO заполнить
}