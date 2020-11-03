import { FieldArray } from 'formik';
import React, { FC } from 'react';

import { LANGUAGE_SELECT_OPTIONS } from '../../../formOptions';
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

export default ContactsForm;
