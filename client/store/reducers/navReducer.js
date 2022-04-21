import * as types from "../types";

const initialState = {
    currentSection: ""
}

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CURRENT_SECTION:
            return {...state}
        case types.SET_CURRENT_SECTION:
            return {...state, currentSection: action.payload}
        default:
            return {...state}
    }
}

export default navReducer;