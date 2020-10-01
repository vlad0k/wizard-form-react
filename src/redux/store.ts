import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import addFormReducer from "./addFormReducer";

let store = createStore(
  combineReducers({ addForm: addFormReducer }),
  composeWithDevTools()
);

const rootState = store.getState();
export type StateType = typeof rootState;
export default store;
