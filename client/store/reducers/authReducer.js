import {TOGGLE_LOGIN} from "../types";
import {getTokens} from "../../utils/tokens";

const initialState = {
    isAuthenticated: Boolean(getTokens().accessToken),
    token: getTokens().accessToken,
    user: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOGIN:
            return {
                ...state,
                isAuthenticated: action.payload.isLoggedIn,
                token: action.payload.token,
            }
        default:
            return state;
    }
}