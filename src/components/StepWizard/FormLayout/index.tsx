import React, { FC, ReactNode } from 'react';
import classNames from './index.module.css';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { nextStep, resetForm, submitStep } from '../../../redux/stepWizardReducer';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/store';
import { ObjectSchema } from 'yup';
import { addUser } from '../../../redux/usersListReducer';
import NavigationButtons from '../NavigationButtons';
import { deleteFormState, saveFormState } from '../../../localStorage';

const FormLayout: FC<FormLayoutPropsType> = ({ children, initialValues, validationSchema }) => {
  const dispatch = useDispatch();
  const { currentStep, numberOfSteps, form } = useSelector(
    ({ stepWizard: { currentStep, numberOfSteps, form } }: StateType) => ({
      currentStep,
      numberOfSteps,
      form,
    }),
  );

  const formSubmitHandler = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    formikHelpers.resetForm();
    dispatch(submitStep(values));
    dispatch(nextStep());
    saveFormState({ ...form, ...values });
    if (currentStep === numberOfSteps - 1) {
      dispatch(addUser(form));
      dispatch(resetForm());
      deleteFormState();
    }
  };
  console.log(initialValues);
  return (
    <div className={classNames.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={formSubmitHandler}
        validationSchema={validationSchema}
      >
        <Form className={classNames.form}>
          <div className={classNames.columns}>{children}</div>
          <NavigationButtons />
        </Form>
      </Formik>
    </div>
  );
};

export default FormLayout;

type FormLayoutPropsType = {
  children: ReactNode;
  initialValues: FormikValues;
  validationSchema: ObjectSchema;
};
