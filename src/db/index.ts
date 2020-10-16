import Dexie, { IndexableType } from 'dexie';
import { UserType } from '../types';

var db = new Dexie('WizardFormAppDB');

db.version(11).stores({
  users: '++id',
  formState: '++id',
});
db.open();
export default db;

export const getUsers = async () => {
  return await db.table('users').toArray();
};

export const addUser = (user: UserType) => {
  db.table('users').add(user);
};

export const deleteUser = (id: IndexableType) => {
  db.table('users').delete(id);
};
