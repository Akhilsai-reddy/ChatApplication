import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./UserAuth/Reducer";
import usersAndMessagesReducer from "./UsersRedux/Reducer";

const rootReducer = combineReducers({
    userAuth: userAuthReducer,
    usersAndMessages: usersAndMessagesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
})