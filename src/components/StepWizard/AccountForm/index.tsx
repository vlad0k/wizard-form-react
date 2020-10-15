import React, { FC, useEffect } from 'react';
import FormLayout from '../FormLayout';
import AvatarPicker from '../../ui/AvatarPicker';
import InputField from '../../ui/InputField';
import * as Yup from 'yup';
import { UsersFetchStatus, UserType } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/store';
import { importUsers } from '../../../redux/usersListReducer';

const AccountForm: FC<AccountFormPropsType> = () => {
  const { initialValues, users, usersFetchStatus } = useSelector(
    ({
      addForm: { avatar, password, username },
      users: { users, usersFetchStatus },
    }: StateType) => ({
      users,
      usersFetchStatus,
      initialValues: { avatar, password, username },
    }),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importUsers());
  }, [dispatch]);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('required field')
      .notOneOf(
        users.map((user: UserType) => user.username),
        "you can't use this username",
      )
      .test(
        'users fetched',
        'users are not fetched',
        () => usersFetchStatus !== UsersFetchStatus.unfetched,
      ),
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
