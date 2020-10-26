import { FormikValues } from 'formik';
import React, { FC, ReactNode } from 'react';
import * as Yup from 'yup';

import ageValidator from '../../../utils/dateYearSubstract';
import DatePicker from '../../ui/DatePicker';
import FieldError from '../../ui/FieldError';
import InputField from '../../ui/InputField';
import LocationPicker from '../../ui/LocationPicker';
import RadioGroup from '../../ui/RadioGroup';
import FormLayout from '../FormLayout';

const ProfileForm: FC = () => (
  <>
    <div>
      <InputField name="firstname" label="First Name" />
      <InputField name="lastname" label="Last Name" />
      <DatePicker name="birthdate" />
    </div>
    <div>
      <InputField name="email" label="Email" />
      <LocationPicker name="address" label="Address" />
      <RadioGroup
        label="Gender"
        name="gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
      />
      <FieldError name="gender" />
    </div>
  </>
);

export default ProfileForm;
