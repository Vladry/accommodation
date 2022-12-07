import {combineReducers} from "redux";
import {userReducer} from "./user";
import datingChatReducer from "./datingChats/reducer.js";

export default combineReducers({
    userData: userReducer,
    datingChatData: datingChatReducer,
});