import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import React, { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ObjectSchema } from 'yup';

import { deleteFormState, saveFormState } from '../../../localStorage';
import { nextStep, resetForm, submitForm } from '../../../redux/stepWizardReducer';
import { StateType } from '../../../redux/store';
import { addUser, updateUser } from '../../../redux/usersListReducer';
import classNames from './index.module.css';

const FormLayout: FC<FormLayoutPropsType> = ({
  children,
  initialValues,
  validationSchema,
  isFinish = false,
  isEditMode = false,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { form } = useSelector(
    ({ stepWizard: { currentStep, numberOfSteps, form, isEditMode } }: StateType) => ({
      currentStep,
      numberOfSteps,
      form,
    }),
  );

  const formSubmitHandler = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    if (!isEditMode) {
      dispatch(submitForm(values));
      dispatch(nextStep());
      saveFormState({ ...form, ...values });
      if (isFinish) {
        dispatch(addUser({ ...form, ...values }));
        dispatch(resetForm());
        deleteFormState();
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
  validationSchema: ObjectSchema;
  isFinish?: boolean;
  isEditMode?: boolean;
};
