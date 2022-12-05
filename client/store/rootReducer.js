import {combineReducers} from "redux";
import {userReducer} from "./user";
import messageReducer from "./message/reducer.js";
import dialogReducer from './dialog/reducer';

export default combineReducers({
    userData: userReducer,
    messageData: messageReducer,
    dialogData: dialogReducer
});