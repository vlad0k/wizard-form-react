import React, { FC } from 'react';

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

export default AccountForm;
