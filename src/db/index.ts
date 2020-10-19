import Dexie, { IndexableType } from 'dexie';
import { UserType } from '../types';
import { FormikValues } from 'formik';

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

export const getUser = async (id: IndexableType): Promise<UserType> => {
  const users = await db.table('users').toArray();
  const user = users.find((user) => +user.id === +id);
  return user;
};

export const updateUser = async (id: number, values: FormikValues) => {
  console.log(values);
  await db.table('users').put({ ...values, id, lastUpdated: new Date() });
};

export const addUser = async (user: FormikValues) => {
  db.table('users').add({ ...user, lastUpdated: new Date() });
};

export const deleteUser = async (id: IndexableType) => {
  db.table('users').delete(id);
};

export const deleteAllUsers = async () => {
  db.table('users').clear();
};

export const searchUsers = async (search: string) => {
  if (!search) {
    return [];
  }

  const users = await getUsers();
  return users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(search.toLowerCase()) ||
      user.lastname.toLowerCase().includes(search.toLowerCase()),
  );
};
