import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./rootReducer";
import {getSession} from "next-auth/react";
import {userActions} from "./user";

// initial states here
const initialState = {};

// middleware
const middleware = [thunk];


//creating store the old way:
export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
/* React рекоммендует переходить на configureStore вместо deprecated createStore:
 инструкция и теория здесь:  https://redux-toolkit.js.org/api/configureStore
 import {configureStore} from '@reduxjs/toolkit';
 */


// assigning store to next wrapper
const makeStore = () => {
    getSession()
        .then(s => {
            if (!!s) {
                store.dispatch(userActions.getUser())
            }
        })
    return store;
};

export const wrapper = createWrapper(makeStore);