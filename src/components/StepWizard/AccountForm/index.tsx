import { FormikValues } from 'formik';
import React, { FC } from 'react';

import Yup from '../../../yup';
import AvatarPicker from '../../ui/AvatarPicker';
import InputField from '../../ui/InputField';
import FormLayout from '../FormLayout';

const AccountForm: FC<AccountFormPropsType> = ({ initialValues }) => {
  const validationSchema = Yup.object({
    avatar: Yup.mixed().notRequired().fileSizeInMb(),
    username: Yup.string().required('required field').uniqueUsername(),
    password: Yup.string().required('required field'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), ''], "passwords don't match")
      .required('required field'),
  });
  return (
    <FormLayout
      initialValues={{ ...initialValues, passwordRepeat: initialValues.password }}
      validationSchema={validationSchema}
    >
      <div>
        <AvatarPicker name="avatar" />
      </div>
      <div>
        <InputField name="username" label="User Name" />
        <InputField name="password" label="Password" type="password" />
        <InputField name="passwordRepeat" label="Repeat Password" type="password" />
      </div>
    </FormLayout>
  );
};

export default AccountForm;

type AccountFormPropsType = {
  initialValues: FormikValues;
};
