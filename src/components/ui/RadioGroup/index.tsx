import { Field } from 'formik';
import React, { FC } from 'react';

import { RadioOptionType } from '../../../types';
import FieldError from '../FieldError';
import FormLabel from '../FormLabel';
import classNames from './index.module.css';

const RadioGroup: FC<RadioGroupPropsType> = ({ name, options, label }) => {
  return (
    <div className={classNames.radioGroup}>
      <FormLabel label={label} />
      <div className={classNames.wrapper}>
        {options.map(({ value, label }) => (
          <label key={value}>
            <Field type="radio" name={name} value={value} />
            <div className={classNames.radio} />
            <span>{label}</span>
          </label>
        ))}
      </div>
      <FieldError name={name} />
    </div>
  );
};

export default RadioGroup;

type RadioGroupPropsType = {
  name: string;
  options: RadioOptionType[];
  label: string;
};
