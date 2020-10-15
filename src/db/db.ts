import Dexie from 'dexie';
import { UserType } from '../types';
import { importUsers, isFetching } from '../redux/usersListReducer';
import { Dispatch } from 'redux';

var db = new Dexie('WizardFormAppDB');

db.version(10).stores({ users: '++id' });
db.open();

// TODO to sort out
export const getUsersFromDb = async (dispatch: Dispatch) => {
  dispatch(isFetching(true));
  const users: UserType[] = await db.table('users').toArray();
  dispatch(importUsers(users));
  return users;
};

export default db;
