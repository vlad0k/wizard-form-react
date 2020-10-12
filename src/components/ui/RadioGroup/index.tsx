import React, { FC } from 'react';
import classNames from './index.module.css';
import { Field } from 'formik';
import { RadioOptionType } from '../../../types';

const RadioGroup: FC<RadioGroupPropsType> = ({ name, options }) => {
  return (
    <div className={classNames.radioGroup}>
      {options.map(({ value, label }) => (
        <label key={value}>
          <Field type="radio" name={name} value={value} />
          <div className={classNames.radio} />
          {label}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;

type RadioGroupPropsType = {
  name: string;
  options: RadioOptionType[];
};
