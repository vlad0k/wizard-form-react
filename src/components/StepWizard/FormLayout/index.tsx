import React, { FC, ReactNode } from 'react';
import classNames from './index.module.css';
import { Form, Formik, FormikErrors, FormikHelpers, FormikValues } from 'formik';
import Button from '../../ui/Button';
import { ButtonAppearance } from '../../../types';
import { clearForm, goBack } from '../../../redux/addFormReducer';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/store';
import db from '../../../db/db';
import {ObjectSchema} from "yup";

const FormLayout: FC<FormLayoutPropsType> = ({
  children,
  initialValues,
                                               validationSchema,
}) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: StateType) => state.addForm.currentStep);

  const backButtonClickHandler = () => dispatch(goBack());
  const formSubmitHandler = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    db.table('users').add(values);
    formikHelpers.resetForm();
    dispatch(clearForm());
  };

  return (
    <div className={classNames.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={formSubmitHandler}
        validationSchema={validationSchema}
      >
        {({ values, errors }) => {
          return (
            <Form className={classNames.form}>
              <div className={classNames.columns}>{children}</div>
              <div className={classNames.buttons}>
                {currentStep + 1 !== 4 ? (
                  <Button>
                    Forward
                  </Button>
                ) : (
                  <Button appearance={ButtonAppearance.finish}>Finish</Button>
                )}
                {currentStep !== 0 && (
                  <Button
                    appearance={ButtonAppearance.secondary}
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
  validationSchema: ObjectSchema
};
