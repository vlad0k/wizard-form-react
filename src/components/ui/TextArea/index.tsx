import React from 'react';
import classNames from './index.module.css';
import { Field, FieldProps } from 'formik';
import FieldError from '../FieldError';

type TextAreaPropsType = {
  name: string;
  label: string;
  maxlength?: number;
};

const TextArea = ({ name, label, maxlength }: TextAreaPropsType) => {
  return (
    <label className={classNames.inputField}>
      <span>{label}</span>
      <Field name={name} id={name}>
        {({ field }: FieldProps) => (
          <textarea className={classNames.textarea} {...field} maxLength={maxlength} />
        )}
      </Field>
      <FieldError name={name} />
    </label>
  );
};

export default TextArea;
