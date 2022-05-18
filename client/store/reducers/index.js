import {combineReducers} from "redux";
import userReducer from "./userReducer";
import navReducer from "./navReducer";

export default combineReducers({
    navigationData: navReducer,
    userData: userReducer
});