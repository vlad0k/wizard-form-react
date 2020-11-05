import { FieldArray } from 'formik';
import React, { FC } from 'react';

import { LANGUAGE_SELECT_OPTIONS, REQUIRED_FIELD_MESSAGE } from '../../../formOptions';
import Yup from '../../../yup';
import InputField from '../../ui/InputField';
import PhoneInput from '../../ui/PhoneInput';
import SelectField from '../../ui/SelectField';
import PhoneInputs from '../PhoneInputs';

const ContactsForm: FC = () => (
  <>
    <div>
      <InputField name="company" label="Company" isRequiredField />
      <InputField name="github" label="GitHub Link" />
      <InputField name="facebook" label="Facebook Link" />
      <SelectField
        name="mainLang"
        options={LANGUAGE_SELECT_OPTIONS}
        label="Main Language"
        isRequiredField
      />
    </div>

    <div>
      <PhoneInput name="fax" label="Fax" />
      <FieldArray name="phoneNumbers">{PhoneInputs}</FieldArray>
    </div>
  </>
);

export const validationSchema = () =>
  Yup.object({
    phoneNumbers: Yup.array().of(Yup.string()),
    company: Yup.string().required(REQUIRED_FIELD_MESSAGE),
    mainLang: Yup.string().required(REQUIRED_FIELD_MESSAGE).nullable(),
  });

export default ContactsForm;
