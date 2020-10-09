import { createStore, combineReducers, Store, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import addFormReducer from './addFormReducer';
import usersListReducer, { importUsers } from './usersListReducer';
import db from '../db/db';
import { UserType } from '../types';

export const dbMiddleware: Middleware<{}, StateType> = (store) => (next) => (action) => {
  const result = next(action);
  const getUsersFromDb = async () => {
    const users: UserType[] = await db.table('users').toArray();
    next(importUsers(users));
  };
  getUsersFromDb();
  return result;
};

let store: Store = createStore(
  combineReducers({ addForm: addFormReducer, users: usersListReducer }),
  composeWithDevTools(applyMiddleware(dbMiddleware)),
);

db.table('users')
  .toArray()
  .then((users: UserType[]) => store.dispatch(importUsers(users)));

const rootState = store.getState();
export type StateType = typeof rootState;
export default store;
