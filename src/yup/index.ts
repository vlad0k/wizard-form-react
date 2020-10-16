import * as Yup from 'yup';
import { getUsers } from '../db';
import { StringSchema } from 'yup';

Yup.addMethod<StringSchema>(Yup.string, 'uniqueUsername', function () {
  return this.test('uniqueUsername', "you can't use this username", async (value) => {
    const users = await getUsers();
    return !users.map((user) => user.username).includes(value);
  });
});

declare module 'yup' {
  interface StringSchema {
    uniqueUsername: () => StringSchema<string | null | undefined>;
  }
}
