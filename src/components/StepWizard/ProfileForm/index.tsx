import React, { FC } from 'react';

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

export default ProfileForm;
