import React, { FC } from 'react';

import { REQUIRED_FIELD_MESSAGE } from '../../../formOptions';
import ageValidator from '../../../utils/dateYearSubstract';
import Yup from '../../../yup';
import DatePicker from '../../ui/DatePicker';
import InputField from '../../ui/InputField';
import LocationPicker from '../../ui/LocationPicker';
import RadioGroup from '../../ui/RadioGroup';

const ProfileForm: FC = () => (
  <>
    <div>
      <InputField name="firstname" label="First Name" isRequiredField />
      <InputField name="lastname" label="Last Name" isRequiredField />
      <DatePicker name="birthdate" label="Birth Date" isRequiredField />
    </div>
    <div>
      <InputField name="email" type="email" label="Email" isRequiredField />
      <LocationPicker name="address" label="Address" />
      <RadioGroup
        label="Gender"
        name="gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        isRequiredField
      />
    </div>
  </>
);

export const validationSchema = (editMode: boolean = false, skipId: number) =>
  Yup.object({
    firstname: Yup.string().required(REQUIRED_FIELD_MESSAGE),
    lastname: Yup.string().required(REQUIRED_FIELD_MESSAGE),
    email: Yup.string()
      .required(REQUIRED_FIELD_MESSAGE)
      .email('incorrect email format')
      .uniqueEmail(editMode, skipId),
    birthdate: Yup.date()
      .required(REQUIRED_FIELD_MESSAGE)
      .max(ageValidator(18), 'You should be 18 years old')
      .nullable(),
    gender: Yup.string().nullable().required('please, choose your gender'),
  });

export default ProfileForm;
