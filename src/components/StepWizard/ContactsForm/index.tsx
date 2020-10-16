import React from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../../redux/store';
import * as Yup from 'yup';
import FormLayout from '../FormLayout';
import InputField from '../../ui/InputField';
import SelectField from '../../ui/SelectField';
import { FieldArray } from 'formik';
import PhoneInputs from '../PhoneInputs';
import { OptionsType, OptionTypeBase } from 'react-select';
import PhoneInput from '../../ui/PhoneInput';

const LANGUAGE_SELECT_OPTIONS: OptionsType<OptionTypeBase> = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Russian' },
  { value: 'ua', label: 'Ukrainian' },
];

const ContactsForm = () => {
  const initialValues = useSelector(
    ({ form: { company, github, facebook, mainLang, fax, phoneNumbers } }: StateType) => ({
      company,
      github,
      facebook,
      mainLang,
      fax,
      phoneNumbers,
    }),
  );

  const validationSchema = Yup.object({
    phoneNumbers: Yup.array().of(Yup.string()),
    company: Yup.string().required('required field'),
    mainLang: Yup.object().required('required field').nullable(),
  });

  return (
    <FormLayout initialValues={initialValues} validationSchema={validationSchema}>
      <div>
        <InputField name="company" label="Company" />
        <InputField name="github" label="GitHub Link" />
        <InputField name="facebook" label="Facebook Link" />
        <SelectField name="mainLang" options={LANGUAGE_SELECT_OPTIONS} label="Main Language" />
      </div>

      <div>
        <PhoneInput name="fax" label="Fax" />
        <FieldArray name="phoneNumbers">{PhoneInputs}</FieldArray>
      </div>
    </FormLayout>
  );
};

export default ContactsForm;
