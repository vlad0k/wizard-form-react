import React, { FC, ReactNode } from 'react';
import classNames from './index.module.css';
import { Form, Formik, FormikValues } from 'formik';
import Button from '../../ui/Button';
import { ButtonAppearance, UserType } from '../../../types';
import { clearForm, goBack, moveForward, step4FormSubmit } from '../../../redux/addFormReducer';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import moment from 'moment';
import { StateType } from '../../../redux/store';
import db from '../../../db/db';

const FormLayout: FC<FormLayoutPropsType> = ({
  children,
  initialValues,
  currentStep,
  numberOfSteps,
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: StateType) => {
    return state.users.users;
  });

  const validationSchema = Yup.object({
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
    firstname: Yup.string().required('required field'),
    lastname: Yup.string().required('required field'),
    email: Yup.string().required('required field').email('incorrect email format'),
    birthdate: Yup.date()
      .required('required field')
      .max(moment().subtract(18, 'years').toDate(), 'You should be 18 years old'),
    gender: Yup.string().required('please, choose your gender'),
    phoneNumbers: Yup.array().of(Yup.string().required('required field')),
    company: Yup.string().required('required field'),
    mainLang: Yup.string().required('required field'),
    skills: Yup.array()
      .of(Yup.string().required('required field'))
      .min(3, 'you should have al least 3 skills'),
  });

  const backButtonClickHandler = () => dispatch(goBack());
  const forwardButtonClickHandler = (values: FormikValues) => {
    dispatch(moveForward(values));
  };
  const formSubmitHandler = (values: FormikValues) => {
    db.table('users').add(values);
    dispatch(clearForm());
  };

  return (
    <div className={classNames.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={formSubmitHandler}
        validationSchema={validationSchema}
      >
        {({ values }) => {
          return (
            <Form className={classNames.form}>
              <div className={classNames.twoColumns}>{children}</div>
              <div className={classNames.buttons}>
                {currentStep + 1 !== numberOfSteps ? (
                  <Button onClick={() => forwardButtonClickHandler(values)} type={'button'}>
                    Forward
                  </Button>
                ) : (
                  <Button appearance={ButtonAppearance.Finish}>Finish</Button>
                )}
                {currentStep !== 0 && (
                  <Button
                    appearance={ButtonAppearance.Secondary}
                    type="button"
                    onClick={backButtonClickHandler}
                  >
                    Back
                  </Button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormLayout;

type FormLayoutPropsType = {
  children: ReactNode;
  initialValues: FormikValues;
  numberOfSteps: number;
  currentStep: number;
};
