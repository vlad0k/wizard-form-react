import { Field, FieldProps } from 'formik';
import React, { FC } from 'react';

import classNames from './index.module.css';

const Checkbox: FC<CheckboxPropsType> = ({ name, label, value }) => {
  return (
    <label className={classNames.wrapper} htmlFor={value}>
      <Field name={name} value={label} type="checkbox">
        {({ field }: FieldProps) => {
          return (
            <>
              <input {...field} id={value} type="checkbox" />
              <div className={classNames.checkbox} />
            </>
          );
        }}
      </Field>
      <span>{label}</span>
    </label>
  );
};

type CheckboxPropsType = {
  name: string;
  label: string;
  value: string;
};

export default Checkbox;
