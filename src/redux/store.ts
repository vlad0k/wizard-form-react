import { applyMiddleware,combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import stepWizardReducer from './stepWizardReducer';
import usersListReducer from './usersListReducer';

let store: Store = createStore(
  combineReducers({
    stepWizard: stepWizardReducer,
    users: usersListReducer,
  }),
  {},
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

const rootState = store.getState();
export type StateType = typeof rootState;
export default store;
