/*eslint no-redeclare: 0 */
import * as Yup from 'yup';
import { MixedSchema, StringSchema } from 'yup';

import { getUsers } from '../db';

Yup.addMethod<StringSchema>(Yup.string, 'uniqueUsername', function () {
  return this.test('uniqueUsername', "you can't use this username", async (value) => {
    const users = await getUsers();
    return !users.map((user) => user.username).includes(value);
  });
});

Yup.addMethod<StringSchema>(Yup.string, 'uniqueEmail', function () {
  return this.test('uniqueEmail', 'user with this email has already registered', async (value) => {
    const users = await getUsers();
    return !users.map((user) => user.email).includes(value);
  });
});

Yup.addMethod<MixedSchema>(Yup.mixed, 'fileSizeInMb', function (sizeInMb: number = 1) {
  return this.test('fileSizeInMb', `avatar should be less than ${sizeInMb} mb`, (value) => {
    return value ? value.size <= sizeInMb * 1_048_576 : true;
  });
});

declare module 'yup' {
  interface StringSchema {
    uniqueUsername: () => StringSchema<string | null | undefined>;
    uniqueEmail: () => StringSchema<string | null | undefined>;
  }

  // @ts-ignore
  interface MixedSchema {
    fileSizeInMb: (sizeInMb?: number) => MixedSchema<{} | null | undefined, object>;
  }
}

export default Yup;
