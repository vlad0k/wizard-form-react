import Dexie, { IndexableType } from 'dexie';
import { FormikValues } from 'formik';

import { UserType } from '../types';

const USERS_TABLE_NAME = 'users';

const manualSlowing = () => {
  let result = '';
  let i = 0;
  do {
    i = i + 1;
    result = result + i;
  } while (i < 10000);
};

const db = new Dexie('WizardFormAppDB');

db.version(11).stores({
  users: '++id',
  formState: '++id',
});
db.open();
export default db;

export const getUsers = async () => {
  manualSlowing();
  return await db.table(USERS_TABLE_NAME).toArray();
};

export const getUser = async (id: IndexableType): Promise<UserType> => {
  manualSlowing();
  const users = await db.table(USERS_TABLE_NAME).toArray();
  const user = users.find((user) => +user.id === +id);
  return user || {};
};

export const updateUser = async (id: number, values: FormikValues) => {
  //TODO filter values
  manualSlowing();
  await db.table(USERS_TABLE_NAME).put({ ...values, id, updatedAt: new Date() });
};

export const addUser = async (user: FormikValues) => {
  manualSlowing();
  db.table(USERS_TABLE_NAME).add({ ...user, updatedAt: new Date() });
};

// TODO comment проверить пропсы на уровне src/db/index
//  id => integer?
//  user data => filter required fields
export const deleteUser = async (id: IndexableType) => {
  //TODO id validation and old id unexhisting user
  manualSlowing();
  db.table(USERS_TABLE_NAME).delete(+id);
};

export const deleteAllUsers = async () => {
  manualSlowing();
  db.table(USERS_TABLE_NAME).clear();
};

export const searchUsers = async (search: string) => {
  manualSlowing();
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

export const checkUniqueValue = async ({
  value = '',
  valueName,
  currentUserId = NaN,
}: CheckUniqueValueArgs) => {
  manualSlowing();
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
