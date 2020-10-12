import React, { FC } from 'react';
import classNames from './index.module.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { accountFormForward } from '../../../redux/addFormReducer';

import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
import AvatarPicker from '../../ui/AvatarPicker';
import { StateType } from '../../../redux/store';
import { UserType } from '../../../types';

interface Values {
  username: string;
  password: string;
  passwordRepeat: string;
  avatar: File | null;
}

const Step1Form: FC<Step1FormProps> = ({ initialValues }) => {
  const dispatch = useDispatch();
  const users = useSelector((state: StateType) => state.users.users);

  const validateScema = Yup.object({
    username: Yup.string()
      .required('required field')
      .notOneOf(
        users.map((u: UserType) => u.username),
        "you can't use this username",
      ),
    password: Yup.string().required('required field'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'passwords must match')
      .required('required field'),
  });

  const formSubmit = (values: Values) => {
    dispatch(accountFormForward(values));
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validateScema} onSubmit={formSubmit}>
      <Form className={classNames.form}>
        <div className={classNames.column}>
          <AvatarPicker name={'avatar'} />
        </div>
        <div className={classNames.column}>
          <InputField name="username" label="User Name" />
          <InputField name="password" label="Password" type="password" />
          <InputField name="passwordRepeat" label="Repeat Password" type="password" />
          <div className={classNames.button}>
            <Button>Forward</Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Step1Form;

type Step1FormProps = {
  initialValues: Values;
};