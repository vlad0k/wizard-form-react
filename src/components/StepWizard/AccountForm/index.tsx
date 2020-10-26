import { FormikValues } from 'formik';
import React, { FC, ReactNode } from 'react';

import AvatarPicker from '../../ui/AvatarPicker';
import InputField from '../../ui/InputField';

const AccountForm: FC = () => (
  <>
    <div>
      <AvatarPicker name="avatar" />
    </div>
    <div>
      <InputField name="username" label="User Name" />
      <InputField name="password" label="Password" type="password" />
      <InputField name="passwordRepeat" label="Repeat Password" type="password" />
    </div>
  </>
);

export default AccountForm;
