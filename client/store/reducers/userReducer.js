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
    candidateDatingProfile: null,
    loadingCandidateDatingProfile: false,
    isCurrUserHasDatingProfile: false,
    
    matchingCandidatesIds: null,
    loadingMatchingCandidatesIds: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET_TENANT_USER_PROFILE:
            return {...state, loadingTenantUserProfile: true}
        case types.SET_TENANT_USER_PROFILE_SUCCESS:
            return {...state, tenantUserProfile: action.payload, loadingTenantUserProfile: false, isCurrUserHasTenantProfile: true}
        case types.SET_TENANT_USER_PROFILE_FAIL:
            return {...state, tenantUserProfile: null, loadingTenantUserProfile: false, isCurrUserHasTenantProfile: false}


        case types.GET_ACCOMMODATION_USER_PROFILE:
            return {...state, loadingAccommodationUserProfile: true}
        case types.SET_ACCOMMODATION_USER_PROFILE_SUCCESS:
            return {...state, accommodationUserProfiles: action.payload, loadingAccommodationUserProfile: false, isCurrUserHasAccommodationProfile: true}
        case types.SET_ACCOMMODATION_USER_PROFILE_FAIL:
            return {...state, accommodationUserProfiles: null, loadingAccommodationUserProfile: false, isCurrUserHasAccommodationProfile: false}


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
            return {...state, loading: true}
        case types.SET_USER_DATING_PROFILE_SUCCESS:
            return {...state, userDatingProfile: action.payload, isCurrUserHasDatingProfile: true, loading: false}
        case types.SET_USER_DATING_PROFILE_FAIL:
            return {...state, isCurrUserHasDatingProfile: false, loading: false}

        
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