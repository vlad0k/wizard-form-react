import React, { FC } from 'react';
import classNames from './index.module.css';
import { Field, FieldProps } from 'formik';

type CheckboxPropsType = {
  name: string;
  label: string;
  value: string;
};

const Checkbox: FC<CheckboxPropsType> = ({ name, label, value }) => {
  //  TODO create ui checkbox
  return (
    <label className={classNames.wrapper} htmlFor={value}>
      <Field name={name} value={value} type="checkbox">
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

export default Checkbox;
