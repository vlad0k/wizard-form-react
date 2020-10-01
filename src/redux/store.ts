import { createStore, combineReducers } from "redux";

import addFormReducer from "./addFormReducer";

let store = createStore(combineReducers({ addFormReducer }));

export default store;
