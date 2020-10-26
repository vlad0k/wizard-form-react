import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import React, { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ObjectSchema } from 'yup';

import { deleteFormState, saveFormState } from '../../../localStorage';
import { nextStep, resetForm, submitForm } from '../../../redux/stepWizardReducer';
import { StateType } from '../../../redux/store';
import { addUser, updateUser } from '../../../redux/usersListReducer';
import ageValidator from '../../../utils/dateYearSubstract';
import Yup from '../../../yup';
import NavigationButtons from '../NavigationButtons';
import classNames from './index.module.css';

// const validationSchema = Yup.object({
//   avatar: Yup.mixed().notRequired().fileSizeInMb(),
//   username: Yup.string().required('required field').uniqueUsername(),
//   password: Yup.string().required('required field'),
//   passwordRepeat: Yup.string()
//     .oneOf([Yup.ref('password'), ''], "passwords don't match")
//     .required('required field'),
//   firstname: Yup.string().required('required field'),
//   lastname: Yup.string().required('required field'),
//   email: Yup.string().required('required field').email('incorrect email format'),
//   birthdate: Yup.date()
//     .notRequired()
//     .max(ageValidator(18), 'You should be 18 years old')
//     .nullable(),
//   gender: Yup.string().nullable().required('please, choose your gender'),
//   phoneNumbers: Yup.array().of(Yup.string()),
//   company: Yup.string().required('required field'),
//   mainLang: Yup.object().required('required field').nullable(),
//   skills: Yup.array()
//     .of(Yup.string().required('required field'))
//     .min(3, ({ min }) => `you should have al least ${min} skills`),
// });

const FormLayout: FC<FormLayoutPropsType> = ({
  children,
  initialValues,
  isFinish = false,
  isEditMode = false,
  prevUrl = '',
  nextUrl = '',
  validationSchema = {},
}) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { form } = useSelector(
    ({ stepWizard: { currentStep, numberOfSteps, form, isEditMode } }: StateType) => ({
      currentStep,
      numberOfSteps,
      form,
    }),
  );

  const formSubmitHandler = (values: FormikValues) => {
    console.log('+');
    if (!isEditMode) {
      if (!isFinish) {
        dispatch(submitForm(values));
        dispatch(nextStep());
        saveFormState({ ...form, ...values });
        history.push(nextUrl);
      } else {
        dispatch(addUser({ ...form, ...values }));
        dispatch(resetForm());
        deleteFormState();
        history.push('/users');
      }
    } else {
      dispatch(updateUser(+id, { ...form, ...values }));
    }
  };

  return (
    <div className={classNames.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={formSubmitHandler}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={classNames.form}>
              <div className={classNames.columns}>{children}</div>
              <NavigationButtons prevUrl={prevUrl} isFinish={isFinish} isEditMode={isEditMode} />
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
  isEditMode?: boolean;
  isFinish?: boolean;
  nextUrl?: string;
  prevUrl?: string;
  validationSchema?: ObjectSchema;
};
