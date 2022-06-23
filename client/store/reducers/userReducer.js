import act from "../types";

const initialState = {
    user: null,
    loading: false,
    datingUserProfile: null,

}

export default (state = initialState, action) => {
    switch (action.type) {

        case act.SET_DATING_USER_PROFILE:
            console.log("in reducer: sending datingUserProfile to store ");
            return {...state, datingUserProfile: action.payload}

        case act.GET_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case act.GET_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loading: false
            }
        case act.GET_PROFILE_FAILURE:
            return {
                ...state,
                user: null,
                loading: false
            }
        default:
            return state;
    }
}