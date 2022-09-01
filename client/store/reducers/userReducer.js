import types from "../types";

const initialState = {
    user: null,
    loading: false,
    accommodationUserProfile: null,
    tenantUserProfile: null,
    userDatingProfile: null,
    candidateDatingProfile: null,
    matchingCandidatesIds: null,
    isCurrUserRegisteredInDating: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TENANT_USER_PROFILE:
            return {...state, tenantUserProfile: action.payload}

        case types.SET_ACCOMMODATION_USER_PROFILE:
            return {...state, accommodationUserProfile: action.payload}

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
            return {...state, userDatingProfile: action.payload, isCurrUserRegisteredInDating: true, loading: false}
        case types.SET_USER_DATING_PROFILE_FAIL:
            return {...state, userDatingProfile: null, isCurrUserRegisteredInDating: false, loading: false}

        case types.GET_CANDIDATE_DATING_PROFILE:
            return {...state, loading: true, candidateDatingProfile: null}
        case types.SET_CANDIDATE_DATING_PROFILE:
            return {...state, candidateDatingProfile: action.payload, loading: false}
        case types.GET_MATCHING_CANDIDATES_IDS:
            return {...state, matchingCandidatesIds: null, loading: true}
        case types.SET_MATCHING_CANDIDATES_IDS:
            return {...state, matchingCandidatesIds: action.payload, loading: false}

        default:
            return state;
    }
}