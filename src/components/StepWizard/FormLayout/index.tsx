import { Form, Formik, FormikValues } from 'formik';
import React, { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ObjectSchema } from 'yup';

import { deleteFormState, saveFormState } from '../../../localStorage';
import { nextStep, resetForm, submitForm } from '../../../redux/stepWizardReducer';
import { StateType } from '../../../redux/store';
import { addUser, updateUser } from '../../../redux/usersListReducer';
import NavigationButtons from '../NavigationButtons';
import classNames from './index.module.css';

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
