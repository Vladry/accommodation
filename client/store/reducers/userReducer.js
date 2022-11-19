import types from "../types";

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

    datingMessages: [],
    datingNotifications: [],
}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.SET_TRUE_DATING_SERVICE_PARTICIPATION:
            console.log("in userReducer-> setting datingServiceParticipation: true");
            // const updatedUser = {...state.user};
            // updatedUser.datingServiceParticipation = true;
            return {...state, user: {datingServiceParticipation: false} };

        case types.SET_DATING_MESSAGES:
            return {...state, datingMessages: action.payload};

        case types.SET_DATING_NOTIFICATIONS:
            return {...state, datingNotifications: action.payload};

        case types.SET_STOMP_CLIENT:
            return {...state, stompClient: action.payload}

        case types.SET_USER_SUBSCRIPTIONS_APPLIED:
            return {...state, isUserAppliedHisSubscriptions: true}

        case types.SET_SUBSCRIPTIONS_SUCCESS:
            return {
                ...state, subscriptions: action.payload.subscriptions, loadingSubscriptions: false
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
            return {...state, isPhotosFetching: action.payload}

        case types.SHELF_REVIEWED_USER_DATA:
            return {...state, reviewedUser: action.payload}

        case types.GET_TENANT_USER_PROFILE:
            return {...state, loadingTenantUserProfile: true}
        case types.SET_TENANT_USER_PROFILE_SUCCESS:
            return {
                ...state,
                tenantUserProfile: action.payload,
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
                accommodationUserProfiles: action.payload,
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
                user: action.payload,
                loading: false
            }
        case types.SET_USER_FAILURE:
            return {
                ...state,
                loading: false
            }


        case types.GET_USER_DATING_PROFILE:
            return {...state, loadingUserDatingProfile: true}

        case types.SET_USER_DATING_PROFILE_SUCCESS:
            // console.log("userDatingProfile from DB: ",action.payload);
            return {
                ...state,
                userDatingProfile: action.payload,
                isCurrUserHasDatingProfile: true,
                loadingUserDatingProfile: false,
            }
        case types.SET_USER_DATING_PROFILE_FAIL:
            return {...state, isCurrUserHasDatingProfile: false, loadingUserDatingProfile: false}


        case types.GET_CANDIDATE_DATING_PROFILE:
            return {...state, loadingCandidateDatingProfile: true}
        case types.SET_CANDIDATE_DATING_PROFILE_SUCCESS:
            return {...state, candidateDatingProfile: action.payload, loadingCandidateDatingProfile: false}
        case types.SET_CANDIDATE_DATING_PROFILE_FAIL:
            return {...state, candidateDatingProfile: null, loadingCandidateDatingProfile: false}
        case types.GET_MATCHING_CANDIDATES_IDS:
            return {...state, loadingMatchingCandidatesIds: true}
        case types.SET_MATCHING_CANDIDATES_IDS:
            const newState = {...state};
            newState.matchingCandidatesIds = {...state.matchingCandidatesIds};// в данном случае необязательная строчка
            return {newState, matchingCandidatesIds: action.payload, loadingMatchingCandidatesIds: false}

        default:
            return state;
    }
}