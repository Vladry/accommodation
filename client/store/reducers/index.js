import {combineReducers} from "redux";
import sampleReducer from "./sampleReducer";
import userReducer from "./userReducer";
import navReducer from "./navReducer";

export default combineReducers({
    navigationData: navReducer,
    sampleData: sampleReducer,
    userData: userReducer
});