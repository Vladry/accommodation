import types from "../types";

const initialState = {
    user: null,
    loading: false,
    accommodationUserProfile: null,
    tenantUserProfile: null,
    userDatingProfile: null,
    candidateDatingProfile: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TENANT_USER_PROFILE:
            return {...state, tenantUserProfile: action.payload}

        case types.SET_ACCOMMODATION_USER_PROFILE:
            return {...state, accommodationUserProfile: action.payload}

        case types.GET_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loading: false
            }
        case types.GET_PROFILE_FAILURE:
            return {
                ...state,
                user: null,
                loading: false
            }
        case types.GET_USER_DATING_PROFILE:
            return {...state, loading: true}
        case types.SET_USER_DATING_PROFILE:
            return {...state, userDatingProfile: action.payload, loading: false}

        case types.GET_CANDIDATE_DATING_PROFILE:
            return {...state, loading: true, candidateDatingProfile: null}
        case types.SET_CANDIDATE_DATING_PROFILE:
            return {...state, candidateDatingProfile: action.payload, loading: false}

        default:
            return state;
    }
}