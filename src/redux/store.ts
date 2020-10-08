import { createStore, combineReducers, Store, Action, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import addFormReducer from './addFormReducer';
import usersListReducer from './usersListReducer';

let store = createStore(
  combineReducers({ addForm: addFormReducer, users: usersListReducer }),
  composeWithDevTools(applyMiddleware()),
);

const rootState = store.getState();
export type StateType = typeof rootState;
export default store;
