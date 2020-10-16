import React, { FC, ReactNode } from 'react';
import classNames from './index.module.css';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import Button from '../../ui/Button';
import { ButtonAppearance, UrlParamTypes } from '../../../types';
import { clearForm, goBack, saveFormToDb, submitForm } from '../../../redux/formReducer';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/store';
import { ObjectSchema } from 'yup';
import { addUser, updateUser } from '../../../redux/usersListReducer';
import { useParams } from 'react-router-dom';

const FormLayout: FC<FormLayoutPropsType> = ({ children, initialValues, validationSchema }) => {
  const dispatch = useDispatch();
  const { id } = useParams<UrlParamTypes>();
  const { currentStep, formValues, isEditMode } = useSelector(
    ({ form: { currentStep, isEditMode, ...formValues } }: StateType) => ({
      currentStep,
      formValues,
      isEditMode,
    }),
  );

  const backButtonClickHandler = () => dispatch(goBack());
  const formSubmitHandler = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    if (!isEditMode) {
      formikHelpers.resetForm();
      if (currentStep === 3) {
        dispatch(addUser({ ...formValues, ...values, lastUpdated: new Date() }));
        dispatch(clearForm());
      } else {
        dispatch(submitForm(values));
        dispatch(saveFormToDb());
      }
    } else {
      dispatch(updateUser(id, values));
      dispatch(submitForm(values));
    }
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
              {!isEditMode && (
                <div className={classNames.buttons}>
                  {currentStep + 1 !== 4 ? (
                    <Button>Forward</Button>
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
              )}
              {isEditMode && (
                <div className={classNames.buttons}>
                  <Button>Save</Button>
                </div>
              )}
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
};
