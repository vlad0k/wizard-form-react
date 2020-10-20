import React, { FC } from 'react';
import classNames from './index.module.css';
import { Field } from 'formik';
import { RadioOptionType } from '../../../types';
import FormLabel from '../FormLabel';

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
    </div>
  );
};

export default RadioGroup;

type RadioGroupPropsType = {
  name: string;
  options: RadioOptionType[];
  label: string;
};
