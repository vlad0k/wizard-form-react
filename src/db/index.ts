import Dexie, { IndexableType } from 'dexie';
import { FormikValues } from 'formik';

import { UserType } from '../types';

const USERS_TABLE_NAME = 'users';

const db = new Dexie('WizardFormAppDB');

db.version(11).stores({
  users: '++id',
  formState: '++id',
});
db.open();
export default db;

export const getUsers = async () => {
  return await db.table(USERS_TABLE_NAME).toArray();
};

export const getUser = async (id: IndexableType): Promise<UserType> => {
  const users = await db.table(USERS_TABLE_NAME).toArray();
  const user = users.find((user) => +user.id === +id);
  return user || {};
};

export const updateUser = async (id: number, values: FormikValues) => {
  //TODO filter values
  await db.table(USERS_TABLE_NAME).put({ ...values, id, updatedAt: new Date() });
};

export const addUser = async (user: FormikValues) => {
  db.table(USERS_TABLE_NAME).add({ ...user, updatedAt: new Date() });
};

// TODO comment проверить пропсы на уровне src/db/index
//  id => integer?
//  user data => filter required fields
export const deleteUser = async (id: IndexableType) => {
  //TODO id validation and old id unexhisting user
  db.table(USERS_TABLE_NAME).delete(+id);
};

export const deleteAllUsers = async () => {
  db.table(USERS_TABLE_NAME).clear();
};

export const searchUsers = async (search: string) => {
  if (!search) {
    return [];
  }

  const users = await getUsers();
  const checkSubstring = (str: string, substr: string) =>
    str.toLowerCase().includes(substr.toLowerCase());
  return users.filter(
    ({ firstname, lastname }) =>
      checkSubstring(firstname, search) || checkSubstring(lastname, search),
  );
};

export const checkUniqueUsername = async (username: string | null = '') => {
  const users = await getUsers();
  return users.find((user) => user.username === username) ? false : true;
};

export const checkUniqueEmail = async (email: string | null = '') => {
  const users = await getUsers();
  return users.find((user) => user.email === email) ? false : true;
};
