import * as Yup from 'yup';
import { MixedSchema, StringSchema } from 'yup';

import { checkUniqueValue } from '../db';

Yup.addMethod<StringSchema>(Yup.string, 'uniqueUsername', function (editMode, skipId) {
  return this.test('uniqueUsername', "you can't use this username", async (value) => {
    const validated = await checkUniqueValue(
      value ? value : '',
      'username',
      editMode ? skipId : NaN,
    );
    return validated;
  });
});

Yup.addMethod<StringSchema>(Yup.string, 'uniqueEmail', function (editMode, skipId) {
  return this.test('uniqueEmail', 'user with this email has already registered', async (value) => {
    const validated = await checkUniqueValue(value ? value : '', 'email', editMode ? skipId : NaN);
    return validated;
  });
});

Yup.addMethod<MixedSchema>(Yup.mixed, 'fileSizeInMb', function (sizeInMb: number = 1) {
  return this.test('fileSizeInMb', `avatar should be less than ${sizeInMb} mb`, (value) => {
    return value ? value.size <= sizeInMb * 1_048_576 : true;
  });
});

declare module 'yup' {
  interface StringSchema {
    uniqueUsername: (editMode: boolean, skipId: number) => StringSchema<string | null | undefined>;
    uniqueEmail: (editMode: boolean, skipId: number) => StringSchema<string | null | undefined>;
  }

  // @ts-ignore
  interface MixedSchema {
    fileSizeInMb: (sizeInMb?: number) => MixedSchema<{} | null | undefined, object>;
  }
}

export default Yup;
