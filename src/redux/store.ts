import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import addFormReducer from "./addFormReducer";

let store = createStore(
  combineReducers({ addFormReducer }),
  composeWithDevTools()
);

export default store;
