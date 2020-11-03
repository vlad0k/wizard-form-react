import Dexie, { IndexableType } from 'dexie';
import { FormikValues } from 'formik';

import { UserType } from '../types';

const USERS_TABLE_NAME = 'users';
const REQUEST_TIMEOUT_SEC = 5;

const db = new Dexie('WizardFormAppDB');

db.version(12).stores({
  users: '++id',
});
db.open();
export default db;

export const getUsers = async () => await db.table(USERS_TABLE_NAME).toArray();

export const getUser = async (id: IndexableType): Promise<UserType> => {
  const users = await db.table(USERS_TABLE_NAME).toArray();
  const user = users.find((user) => +user.id === +id);
  return user || {};
};

export const updateUser = async (id: number, values: FormikValues) => {
  //TODO filter values last priority
  return await db.table(USERS_TABLE_NAME).put({ ...values, id, updatedAt: new Date() });
};

export const addUser = (user: FormikValues) => {
  return new Promise<UserType>((resolve, reject) => {
    setTimeout(() => reject('Request timeout'), REQUEST_TIMEOUT_SEC * 1000); // reject long request

    db.table(USERS_TABLE_NAME)
      .add({ ...user, updatedAt: new Date() })
      .then((id) => resolve(getUser(id)))
      .catch(() => reject('User was not added to db'));
  });
};

export const addUsersBulk = (users: FormikValues[]) => {
  const usersBulk = users.map((user) => ({ ...user, updatedAt: new Date() }));

  return new Promise<UserType[]>((resolve, reject) => {
    setTimeout(() => reject('Request timeout'), REQUEST_TIMEOUT_SEC * 1000); // reject long request

    db.table(USERS_TABLE_NAME)
      .bulkAdd(usersBulk)
      .then(() => resolve(getUsers()))
      .catch(() => reject('Users were not added to db'));
  });
};

export const deleteUser = async (id: number) => {
  //TODO id validation and old id unexhisting user lowes priority
  db.table(USERS_TABLE_NAME).delete(id);
};

export const deleteAllUsers = async () => db.table(USERS_TABLE_NAME).clear();

export const searchUsers = async (search: string) => {
  if (!search) {
    return;
  }

  const users = await getUsers();
  const checkSubstring = (str: string, substr: string) =>
    str.toLowerCase().includes(substr.toLowerCase());
  return users.filter(
    ({ firstname, lastname }) =>
      checkSubstring(firstname, search) || checkSubstring(lastname, search),
  );
};

export const checkUniqueValue = async ({
  value = '',
  valueName,
  currentUserId = NaN,
}: CheckUniqueValueArgs) => {
  const valueToSkip = !Number.isNaN(currentUserId) ? (await getUser(currentUserId))[valueName] : '';
  const users = await getUsers();
  return users.find((user) => user[valueName] === value)
    ? valueToSkip
      ? value === valueToSkip
      : false
    : true;
};

type CheckUniqueValueArgs = {
  value?: string | null;
  valueName: 'email' | 'username';
  currentUserId?: number;
};
