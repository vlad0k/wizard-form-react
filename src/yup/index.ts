import * as Yup from 'yup';
import { getUsers } from '../db';
import { MixedSchema, StringSchema } from 'yup';

Yup.addMethod<StringSchema>(Yup.string, 'uniqueUsername', function () {
  return this.test('uniqueUsername', "you can't use this username", async (value) => {
    const users = await getUsers();
    return !users.map((user) => user.username).includes(value);
  });
});

Yup.addMethod<MixedSchema>(Yup.mixed, 'fileSize', function (sizeInMb: number = 1) {
  return this.test('fileSize', `avatar should be less than ${sizeInMb} mb`, (value) => {
    return value ? value.size <= sizeInMb * 1_048_576 : true;
  });
});

declare module 'yup' {
  interface MixedSchema {
    fileSize: (size?: number) => MixedSchema<{} | null | undefined, object | File>;
  }

  interface StringSchema {
    uniqueUsername: () => StringSchema<string | null | undefined>;
  }
}

export default Yup;
