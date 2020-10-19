import React, { FC } from 'react';
import * as Yup from 'yup';
import FormLayout from '../FormLayout';
import InputField from '../../ui/InputField';
import SelectField from '../../ui/SelectField';
import { FieldArray, FormikValues } from 'formik';
import PhoneInputs from '../PhoneInputs';
import { OptionsType, OptionTypeBase } from 'react-select';
import PhoneInput from '../../ui/PhoneInput';

export const LANGUAGE_SELECT_OPTIONS: OptionsType<OptionTypeBase> = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'ar', label: 'Arabic' },
  { value: 'cmn', label: 'Mandarin' },
  { value: 'ru', label: 'Russian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ms', label: 'Malay' },
  { value: 'fa', label: 'Persian' },
  { value: 'sw', label: 'Swahili' },
  { value: 'ta', label: 'Tamil' },
  { value: 'it', label: 'Italian' },
  { value: 'nl', label: 'Dutch' },
  { value: 'bn', label: 'Bengali' },
  { value: 'tr', label: 'Turkish' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'pl', label: 'Polish' },
  { value: 'jv', label: 'Javanese' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'th', label: 'Thai' },
  { value: 'ko', label: 'Korean' },
];

const ContactsForm: FC<ContactsFormPropsType> = ({ initialValues }) => {
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

type ContactsFormPropsType = {
  initialValues: FormikValues;
};
