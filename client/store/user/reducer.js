import types from "./types";

const initialState = {
    user: null,
    loading: false,
    accommodationUserProfiles: null,
    loadingAccommodationUserProfile: false,
    isCurrUserHasAccommodationProfile: false,

    tenantUserProfile: null,
    loadingTenantUserProfile: false,
    isCurrUserHasTenantProfile: false,

    userDatingProfile: null,
    loadingUserDatingProfile: false,
    isCurrUserHasDatingProfile: false,

    datingSearchCriteriaProfile: null,
    loadingDatingSearchCriteriaProfile: false,
    isDatingSearchCriteriaProfile: false,

    candidateDatingProfile: null,
    loadingCandidateDatingProfile: false,

    matchingCandidatesIds: null,
    loadingMatchingCandidatesIds: false,

    reviewedUser: null,

    isPhotosFetching: false,

    isPaid: true,

    subscriptions: [],
    loadingSubscriptions: false,
    isUserAppliedHisSubscriptions: false,
    stompClient: null,


}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case types.SET_TRUE_DATING_SERVICE_PARTICIPATION:
            const updatedUser = {...state.user};
            updatedUser.datingServiceParticipation = true;
            return {...state, user: updatedUser};


        case types.SET_STOMP_CLIENT:
            return {...state, stompClient: payload}

        case types.SET_USER_SUBSCRIPTIONS_APPLIED:
            // console.log("in reducer-> SET_USER_SUBSCRIPTIONS_APPLIED");
            return {...state, isUserAppliedHisSubscriptions: true}

        case types.SET_SUBSCRIPTIONS_SUCCESS:
            console.log("in reducer-> SET_SUBSCRIPTIONS_SUCCESS,  payload: ", payload);
            return {
                ...state, subscriptions: payload.subscriptions, loadingSubscriptions: false
            }
        case types.SET_SUBSCRIPTIONS_FAIL:
            return {
                ...state, subscriptions: {}, loadingSubscriptions: false
            }
        case types.GET_SUBSCRIPTIONS:
            return {
                ...state, loadingSubscriptions: true
            }

        case types.FETCHING_PHOTOS:
            return {...state, isPhotosFetching: payload}

        case types.SHELF_REVIEWED_USER_DATA:
            return {...state, reviewedUser: payload}

        case types.GET_TENANT_USER_PROFILE:
            return {...state, loadingTenantUserProfile: true}
        case types.SET_TENANT_USER_PROFILE_SUCCESS:
            return {
                ...state,
                tenantUserProfile: payload,
                loadingTenantUserProfile: false,
                isCurrUserHasTenantProfile: true
            }
        case types.SET_TENANT_USER_PROFILE_FAIL:
            return {
                ...state,
                tenantUserProfile: null,
                loadingTenantUserProfile: false,
                isCurrUserHasTenantProfile: false
            }


        case types.GET_ACCOMMODATION_USER_PROFILE:
            return {...state, loadingAccommodationUserProfile: true}
        case types.SET_ACCOMMODATION_USER_PROFILE_SUCCESS:
            return {
                ...state,
                accommodationUserProfiles: payload,
                loadingAccommodationUserProfile: false,
                isCurrUserHasAccommodationProfile: true
            }
        case types.SET_ACCOMMODATION_USER_PROFILE_FAIL:
            return {
                ...state,
                accommodationUserProfiles: null,
                loadingAccommodationUserProfile: false,
                isCurrUserHasAccommodationProfile: false
            }


        case types.SET_LOADING_TRUE:
            return {
                ...state,
                loading: true
            }
        case types.SET_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case types.SET_USER_FAILURE:
            return {
                ...state,
                loading: false
            }

        /*** ----------processing userDatingProfile----------------- ***/
        case types.GET_USER_DATING_PROFILE:
            return {...state, loadingUserDatingProfile: true}
        case types.SET_USER_DATING_PROFILE_SUCCESS:
            // console.log("in reducer-> userDatingProfile from DB: ", payload);
            return {
                ...state,
                userDatingProfile: payload,
                isCurrUserHasDatingProfile: true,
                loadingUserDatingProfile: false,
            }
        case types.SET_USER_DATING_PROFILE_FAIL:
            return {...state, isCurrUserHasDatingProfile: false, loadingUserDatingProfile: false}
        /*** ----------end processing userDatingProfile----------------- ***/



        /*** ----------processing datingSearchCriteriaProfile----------------- ***/

        case types.GET_USER_DATING_SEARCH_CRITERIA_PROFILE:
            return {...state, loadingDatingSearchCriteriaProfile: true}

        case types.SET_USER_DATING_SEARCH_CRITERIA_PROFILE_SUCCESS:
            // console.log("in reducer-> searchCriteria: ", payload)
            return {
                ...state,
                datingSearchCriteriaProfile: payload,
                isDatingSearchCriteriaProfile: true,
                loadingDatingSearchCriteriaProfile: false,
            }
        case types.SET_USER_DATING_SEARCH_CRITERIA_PROFILE_FAIL:
            return {...state, isDatingSearchCriteriaProfile: false, loadingDatingSearchCriteriaProfile: false}
        /*** ----------end processing datingSearchCriteriaProfile----------------- ***/



        case types.GET_CANDIDATE_DATING_PROFILE:
            return {...state, loadingCandidateDatingProfile: true}
        case types.SET_CANDIDATE_DATING_PROFILE_SUCCESS:
            return {...state, candidateDatingProfile: payload, loadingCandidateDatingProfile: false}
        case types.SET_CANDIDATE_DATING_PROFILE_FAIL:
            return {...state, candidateDatingProfile: null, loadingCandidateDatingProfile: false}
        case types.GET_MATCHING_CANDIDATES_IDS:
            return {...state, loadingMatchingCandidatesIds: true}
        case types.SET_MATCHING_CANDIDATES_IDS:
            const newState = {...state};
            newState.matchingCandidatesIds = {...state.matchingCandidatesIds};// в данном случае необязательная строчка
            return {newState, matchingCandidatesIds: payload, loadingMatchingCandidatesIds: false}

        default:
            return state;
    }
}

export default reducer;