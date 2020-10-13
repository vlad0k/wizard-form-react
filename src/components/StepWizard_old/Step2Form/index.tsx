import React, { FC } from 'react';
import classNames from './index.module.css';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../../ui/InputField';
import Button from '../../ui/Button';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { goBack, step2FormForward } from '../../../redux/addFormReducer';
import DatePicker from '../../ui/DatePicker';
import FieldError from '../../ui/FieldError';
import { ButtonAppearance } from '../../../types';

interface Values {
  firstname: string;
  lastname: string;
  email: string;
  adress: string;
  gender: 'male' | 'female' | null;
  birthdate: Date | null;
}

const validateScema = Yup.object({
  firstname: Yup.string().required('required field'),
  lastname: Yup.string().required('required field'),
  email: Yup.string().required('required field').email('incorrect email format'),
  birthdate: Yup.date()
    .required('required field')
    .max(moment().subtract(18, 'years').toDate(), 'You should be 18 years old'),
  gender: Yup.string().required('please, choose your gender'),
});

const Step2Form: FC<Step2FormProps> = ({ initialValues }) => {
  const dispatch = useDispatch();

  const backButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(goBack());
  };

  const submitForm = (values: Values) => {
    dispatch(step2FormForward(values));
  };
  return (
    <Formik initialValues={initialValues} onSubmit={submitForm} validationSchema={validateScema}>
      <Form className={classNames.form}>
        <div className={classNames.column}>
          <InputField name="firstname" label="First Name" />
          <InputField name="lastname" label="Last Name" />
          <DatePicker name="birthdate" />
        </div>
        <div className={classNames.column}>
          <InputField name="email" label="Email" />
          <InputField name="adress" label="Adress" />
          <div className={classNames.radioGroup}>
            <label>
              <Field type="radio" name="gender" value="male" />
              <div className={classNames.radio} />
              Male
            </label>
            <label>
              <Field type="radio" name="gender" value="female" />
              <div className={classNames.radio} />
              Female
            </label>
          </div>
          <FieldError name={'gender'} />
          <div className={classNames.buttons}>
            <Button
              appearance={ButtonAppearance.secondary}
              type="button"
              onClick={backButtonClickHandler}
            >
              Back
            </Button>
            <Button>Forward</Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Step2Form;

type Step2FormProps = {
  initialValues: Values;
};
