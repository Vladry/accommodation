import {combineReducers} from "redux";
import userReducer from "./userReducer";
import messageReducer from "../message/reducer.js";

export default combineReducers({
    userData: userReducer,
    messageData: messageReducer
});