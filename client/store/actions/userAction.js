import api from "../../lib/API";
import types from "../types";

export const getUser = () => (dispatch) => { //TODO разделить фетчевание юзера и udp так ,чтобы на всё не выдавался Exception in getUser -> run  dispatch({type: types.SET_USER_FAILURE})");
    // console.log("in store-> getUser ")
    const userUrl = '/users/profile';
    dispatch({type: types.SET_LOADING_TRUE});
    api.get(userUrl)
        .then(user => {
            // console.log("user found in DB: ", user);
            dispatch({type: types.SET_USER_SUCCESS, payload: user});
            // console.log(`in get(/users/profile. user.id: `, user.id);

            const cb = () => {
            };
            const datingProfileUrl = `/users/${user.id}/datingProfile`;
            dispatch(fetchData(user.id, datingProfileUrl, types.GET_USER_DATING_PROFILE, types.SET_USER_DATING_PROFILE_SUCCESS, types.SET_USER_DATING_PROFILE_FAIL, cb));

            const accommodationUserProfileURL = `/accommodations/${user.id}`;
            dispatch(fetchData(user.id, accommodationUserProfileURL, types.GET_ACCOMMODATION_USER_PROFILE, types.SET_ACCOMMODATION_USER_PROFILE_SUCCESS, types.SET_ACCOMMODATION_USER_PROFILE_FAIL, cb));

            const tenantUserProfileURL = `/tenants/${user.id}`;
            dispatch(fetchData(user.id, tenantUserProfileURL, types.GET_TENANT_USER_PROFILE, types.SET_TENANT_USER_PROFILE_SUCCESS, types.SET_TENANT_USER_PROFILE_FAIL, cb));

        }).catch(e => {
        dispatch({type: types.SET_USER_FAILURE})
        console.log("Exception in getUser -> run  dispatch({type: types.SET_USER_FAILURE})");
    });
}


export const fetchData = (userId, url, loadingAct, successAction, failAction, callback) => (dispatch) => {
    console.log(`in fetchData (userId: ${userId})`);
    try {
        dispatch({type: loadingAct});
        api.get(url).then(data => {
            console.log("fetched data: ", data);
            if (data && (data["userId"] || data[0]["userId"])) {
                // console.log("data: ", data);
                dispatch({type: successAction, payload: data});
            } else {
                console.log("Exception in fetch userData");
                dispatch({type: failAction});
            }
            callback();
        });
    } catch (err) {
        console.log(err)
        console.log("error fetching data by url: ${url} for user id: ", userId, " -> data not found or corrupt");
        dispatch({type: failAction});
    }


}



