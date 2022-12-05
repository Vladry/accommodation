import api from "../../lib/API";
import urls from '../../../src/main/resources/urls.json'
import {userTypes} from "./index.js";

export const getUser = () => (dispatch) => { //TODO разделить фетчевание юзера и udp так ,чтобы на всё не выдавался Exception in getUser -> run  dispatch({type: userTypes.SET_USER_FAILURE})");
    dispatch({type: userTypes.SET_LOADING_TRUE});
    api.get(urls.userUrl)
        .then(user => {
            // console.log("before dispatch:  SET_USER_SUCCESS");
            dispatch({type: userTypes.SET_USER_SUCCESS, payload: user});
            dispatch(fetchData(urls.datingProfile, user.id, userTypes.GET_USER_DATING_PROFILE, userTypes.SET_USER_DATING_PROFILE_SUCCESS, userTypes.SET_USER_DATING_PROFILE_FAIL));
            dispatch(fetchData(urls.userSubscriptions, user.id, userTypes.GET_SUBSCRIPTIONS, userTypes.SET_SUBSCRIPTIONS_SUCCESS, userTypes.SET_SUBSCRIPTIONS_FAIL));
            dispatch(fetchData(urls.datingSearchCriteriaProfile, user.id, userTypes.GET_USER_DATING_SEARCH_CRITERIA_PROFILE, userTypes.SET_USER_DATING_SEARCH_CRITERIA_PROFILE_SUCCESS, userTypes.SET_USER_DATING_SEARCH_CRITERIA_PROFILE_FAIL));

            // dispatch(fetchData(urls.accommodProfile, user.id, userTypes.GET_ACCOMMODATION_USER_PROFILE, userTypes.SET_ACCOMMODATION_USER_PROFILE_SUCCESS, userTypes.SET_ACCOMMODATION_USER_PROFILE_FAIL));
            // dispatch(fetchData(urls.tenantUserProfile, user.id, userTypes.GET_TENANT_USER_PROFILE, userTypes.SET_TENANT_USER_PROFILE_SUCCESS, userTypes.SET_TENANT_USER_PROFILE_FAIL));


            fetch('http://ip-api.com/json/').then(r => r.json()).then(r => {
                const locationWithTimeZone = r.city + ", " + r.country + ", " + r.timezone;
                const location = r.city + ", " + r.country;
                // console.log("location: ", location);
                // формат ответа:
                /*            {
                                "status": "success",
                                "country": "Ukraine",
                                "countryCode": "UA",
                                "region": "30",
                                "regionName": "Kyiv City",
                                "city": "Kyiv",
                                "zip": "04119",
                                "lat": 50.458,
                                "lon": 30.5303,
                                "timezone": "Europe/Kyiv",
                                "isp": "UnderNet LLC",
                                "org": "UnderNet LLC",
                                "as": "AS41435 UnderNet LLC",
                                "query": "79.110.133.25"
                            }*/

                api.put(`/users/${user.id}?location=${location}`, location).then(r => {
                    // console.log("fetched location with response: ", r)
                });

            }).catch((e) => console.log("location not determined, ", e.message))


        }).catch(e => {
        dispatch({type: userTypes.SET_USER_FAILURE})
        console.log("Exception in getUser");
    });
}


export const fetchData = (url, userId, loadingAct, successAction, failAction) => (dispatch) => {
    if (!url || !userId || !loadingAct || !successAction || !failAction) {
        return;
    }
    // console.log(`in fetchData (userId: ${userId})`);
    try {
        dispatch({type: loadingAct});
        api.get(`${url}/${userId}`).then(data => {
            // console.log("fetched data: ", data);
            if (data && (data["userId"] /*|| data[0] && data[0]["userId"]*/)) {
                // console.log("user data: ", data)
                dispatch({type: successAction, payload: data});
            } else {
                console.log("Exception in fetch userData:");
                console.log("loadingAct: ",loadingAct);
                dispatch({type: failAction});
            }
        });
    } catch (err) {
        console.log(err)
        console.log("error fetching data for user id: ", userId);
        dispatch({type: failAction});
    }


}



