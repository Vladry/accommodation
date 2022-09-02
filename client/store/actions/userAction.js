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
            dispatch(getDatingProfile(user.id, types.GET_USER_DATING_PROFILE, types.SET_USER_DATING_PROFILE_SUCCESS, types.SET_USER_DATING_PROFILE_FAIL));
        }).catch(e => {
        dispatch({type: types.SET_USER_FAILURE})
        console.log("Exception in getUser -> run  dispatch({type: types.SET_USER_FAILURE})");
    });
}


export const getDatingProfile = (userId, loadTarget, successAction, failAction) => (dispatch) => {
    console.log(`in getDatingProfile (userId: ${userId})`);
    dispatch({type: loadTarget});
    const url = `/users/${userId}/datingProfile`;
    api.get(url).then(duProfile => {
        console.log("fetched duProfile: ", duProfile);

        if (duProfile["userId"]) {
            console.log("duProfile.userId found: ", duProfile["userId"]);
            dispatch({type: successAction, payload: duProfile});
        } else {
            console.log("duProfile.userId is empty!");
            dispatch({type: failAction});
        }

    })
        .catch(err => {
            console.log(err)
            console.log("error fetching userDatingProfile for user id: ", userId);
            dispatch({type: failAction});
        });

}