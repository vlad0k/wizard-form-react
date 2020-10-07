import React, { useState } from 'react';
import classNames from './index.module.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { accountFormForward } from '../../../redux/addFormReducer';

import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
import AvatarPicker from '../../ui/AvatarPicker';
import db from '../../../db/db';

interface Values {
  username: string;
  password: string;
  passwordRepeat: string;
  avatar: File | null;
}

const validateScema = Yup.object({
  username: Yup.string().required('required field'),
  password: Yup.string().required('required field'),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'passwords must match')
    .required('required field'),
});

const Step1Form = () => {
  const dispatch = useDispatch();

  const formSubmit = ({ username, password, avatar }: Values) => {
    dispatch(accountFormForward({ username, password, avatar }));
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordRepeat: '',
        avatar: null,
      }}
      validationSchema={validateScema}
      onSubmit={formSubmit}
    >
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
