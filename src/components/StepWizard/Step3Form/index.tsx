import React, { FC } from 'react';
import classNames from './index.module.css';
import { FieldArray, Form, Formik } from 'formik';
import InputField from '../../ui/InputField';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { goBack, step3FormSubmit } from '../../../redux/addFormReducer';
import Select, { OptionType } from '../../ui/Select';
import PhoneInputs from './PhoneInputs';
import * as Yup from 'yup';
import { ButtonAppearance } from '../../../types';

interface Values {
  company: string;
  facebook: string;
  github: string;
  mainLang: string;
  fax: string;
  phoneNumbers: Array<string>;
}

const initialValues: Values = {
  company: '',
  facebook: '',
  github: '',
  mainLang: '',
  fax: '',
  phoneNumbers: [''],
};

const options: OptionType[] = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Russian' },
  { value: 'ua', label: 'Ukrainian' },
];

const validateScema = Yup.object({
  phoneNumbers: Yup.array().of(Yup.string().required('required field')),
  company: Yup.string().required('required field'),
  mainLang: Yup.string().required('required field'),
});

const Step3Form: FC<Step3FormPropsType> = ({ initialValues }) => {
  const dispatch = useDispatch();

  const backButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(goBack());
  };

  const submitForm = (values: Values) => {
    dispatch(step3FormSubmit(values));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitForm} validationSchema={validateScema}>
      <Form className={classNames.form}>
        <div className={classNames.column}>
          <InputField name="company" label="Company" />
          <InputField name="github" label="GitHub Link" />
          <InputField name="facebook" label="Facebook Link" />
          <Select name="mainLang" options={options} label="Main Language" />
        </div>

        <div className={classNames.column}>
          <InputField name="fax" label="Fax" />
          <FieldArray name="phoneNumbers">{PhoneInputs}</FieldArray>

          <div className={classNames.buttons}>
            <Button
              type="button"
              appearance={ButtonAppearance.Secondary}
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

export default Step3Form;

type Step3FormPropsType = {
  initialValues: Values;
};
