import React, { FC } from 'react';
import FormLayout from '../FormLayout';
import InputField from '../../ui/InputField';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { StateType } from '../../../redux/store';
import ageValidator from '../../../utils/dateYearSubstract';
import DatePicker from '../../ui/DatePicker';
import LocationPicker from '../../ui/LocationPicker';
import RadioGroup from '../../ui/RadioGroup';
import FieldError from '../../ui/FieldError';

const ProfileForm: FC = () => {
  const initialValues = useSelector(
    ({ addForm: { firstname, lastname, birthdate, email, adress, gender } }: StateType) => ({
      firstname,
      lastname,
      birthdate,
      email,
      adress,
      gender,
    }),
  );

  const validationSchema = Yup.object({
    firstname: Yup.string().required('required field'),
    lastname: Yup.string().required('required field'),
    email: Yup.string().required('required field').email('incorrect email format'),
    birthdate: Yup.date()
      .required('required field')
      .max(ageValidator(18), 'You should be 18 years old'),
    gender: Yup.string().nullable().required('please, choose your gender'),
  });

  return (
    <FormLayout initialValues={initialValues} validationSchema={validationSchema}>
      <div>
        <InputField name="firstname" label="First Name" />
        <InputField name="lastname" label="Last Name" />
        <DatePicker name="birthdate" />
      </div>
      <div>
        <InputField name="email" label="Email" />
        <LocationPicker name="adress" label={'Address'} />
        <RadioGroup
          name="gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
        />
        <FieldError name="gender" />
      </div>
    </FormLayout>
  );
};

export default ProfileForm;
