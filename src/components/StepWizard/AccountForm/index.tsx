import React, { FC, useEffect } from 'react';
import FormLayout from '../FormLayout';
import AvatarPicker from '../../ui/AvatarPicker';
import InputField from '../../ui/InputField';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/store';
import { importUsers } from '../../../redux/usersListReducer';
import db from '../../../db/db';
import _ from 'lodash';

const AccountForm: FC<AccountFormPropsType> = () => {
  const { initialValues } = useSelector(
    ({ addForm: { avatar, password, username } }: StateType) => ({
      initialValues: { avatar, password, username },
    }),
  );

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('required field')
      .test('username is unavaliable', 'you cant use this username', async (value) => {
        const users = await db.table('users').toArray();
        return !users.map((user) => user.username).includes(value);
      }),
    password: Yup.string().required('required field'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), ''], "passwords don't match")
      .required('required field'),
  });

  return (
    <FormLayout
      initialValues={{ ...initialValues, passwordRepeat: '' }}
      validationSchema={validationSchema}
    >
      <div>
        <AvatarPicker name={'avatar'} />
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

type AccountFormPropsType = {};
