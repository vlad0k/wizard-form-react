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

const ProfileForm: FC<ProfileFormPropsType> = ({
  initialValues,
  isFinish = false,
  isEditMode = false,
  navButtons,
}) => {
  const validationSchema = Yup.object({
    firstname: Yup.string().required('required field'),
    lastname: Yup.string().required('required field'),
    email: Yup.string().required('required field').email('incorrect email format'),
    birthdate: Yup.date()
      .notRequired()
      .max(ageValidator(18), 'You should be 18 years old')
      .nullable(),
    gender: Yup.string().nullable().required('please, choose your gender'),
  });

  return (
    <FormLayout
      initialValues={initialValues}
      validationSchema={validationSchema}
      isEditMode={isEditMode}
    >
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
        {navButtons}
      </div>
    </FormLayout>
  );
};

type ProfileFormPropsType = {
  initialValues: FormikValues;
  isFinish?: boolean;
  isEditMode?: boolean;
  navButtons: ReactNode;
};

export default ProfileForm;
