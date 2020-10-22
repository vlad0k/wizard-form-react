import Dexie, { IndexableType } from 'dexie';
import { UserType } from '../types';
import { FormikValues } from 'formik';

const USERS_TABLE_NAME = 'users';

var db = new Dexie('WizardFormAppDB');

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
  return users.find((user) => +user.id === +id);
};

export const updateUser = async (id: number, values: FormikValues) => {
  await db.table(USERS_TABLE_NAME).put({ ...values, id, updatedAt: new Date() });
};

export const addUser = async (user: FormikValues) => {
  db.table(USERS_TABLE_NAME).add({ ...user, updatedAt: new Date() });
};

export const deleteUser = async (id: IndexableType) => {
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
