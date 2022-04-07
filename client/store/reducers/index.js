import {combineReducers} from "redux";
import sampleReducer from "./sampleReducer";
import authReducer from "./authReducer";

export default combineReducers({
    sampleData: sampleReducer,
    auth: authReducer
});