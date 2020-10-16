import React, { FC, ReactNode } from 'react';
import classNames from './index.module.css';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import Button from '../../ui/Button';
import { ButtonAppearance } from '../../../types';
import { clearForm, goBack, submitForm } from '../../../redux/addFormReducer';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../redux/store';
import { ObjectSchema } from 'yup';
import { addUser } from '../../../redux/usersListReducer';

const FormLayout: FC<FormLayoutPropsType> = ({ children, initialValues, validationSchema }) => {
  const dispatch = useDispatch();
  const { currentStep, formValues } = useSelector(
    ({ addForm: { currentStep, ...formValues } }: StateType) => ({
      currentStep,
      formValues,
    }),
  );

  const backButtonClickHandler = () => dispatch(goBack());
  const formSubmitHandler = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    formikHelpers.resetForm();

    if (currentStep === 3) {
      dispatch(addUser({ ...formValues, ...values, lastUpdated: new Date() }));
      dispatch(clearForm());
    } else {
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
