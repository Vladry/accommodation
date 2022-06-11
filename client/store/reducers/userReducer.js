import {GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, SET_USER_ID} from "../types";

const initialState = {
    user: null,
    loading: false,

}

export default (state = initialState, action) => {
    switch (action.type) {
        // case SET_USER_ID:
        // {
        //     console.log("in userReducer: action.payload: ", action.payload);
        //     return {...state, userId: action.payload};
        // }

        case GET_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loading: false
            }
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                user: null,
                loading: false
            }
        default:
            return state;
    }
}