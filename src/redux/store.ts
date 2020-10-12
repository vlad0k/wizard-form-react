import { createStore, combineReducers, Store, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import addFormReducer from './addFormReducer';
import usersListReducer from './usersListReducer';
import { getUsersFromDb } from '../db/db';

export const dbMiddleware: Middleware<{}, StateType> = (store) => (next) => (action) => {
  next(action);
  getUsersFromDb(next);
};

let store: Store = createStore(
  combineReducers({ addForm: addFormReducer, users: usersListReducer }),
  {},
  composeWithDevTools(applyMiddleware(dbMiddleware)),
);

getUsersFromDb(store.dispatch);

const rootState = store.getState();
export type StateType = typeof rootState;
export default store;
