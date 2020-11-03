import React, { FC } from 'react';

import { REQUIRED_FIELD_MESSAGE } from '../../../formOptions';
import Yup from '../../../yup';
import AvatarPicker from '../../ui/AvatarPicker';
import InputField from '../../ui/InputField';

const AccountForm: FC = () => (
  <>
    <div>
      <AvatarPicker name="avatar" />
    </div>
    <div>
      <InputField name="username" label="User Name" isRequiredField />
      <InputField name="password" label="Password" type="password" isRequiredField />
      <InputField name="passwordRepeat" label="Repeat Password" type="password" isRequiredField />
    </div>
  </>
);

export const validationSchema = (editMode: boolean = false, skipId: number) =>
  Yup.object({
    avatar: Yup.mixed().notRequired().fileSizeInMb().nullable(),
    username: Yup.string().required(REQUIRED_FIELD_MESSAGE).uniqueUsername(editMode, skipId),
    password: Yup.string().required(REQUIRED_FIELD_MESSAGE),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), ''], "passwords don't match")
      .required(REQUIRED_FIELD_MESSAGE),
  });

export default AccountForm;
