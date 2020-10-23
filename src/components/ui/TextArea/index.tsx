import { Field, FieldProps } from 'formik';
import React from 'react';

import FieldError from '../FieldError';
import FormLabel from '../FormLabel';
import classNames from './index.module.css';

type TextAreaPropsType = {
  name: string;
  label: string;
  maxlength?: number;
};

const TextArea = ({ name, label, maxlength }: TextAreaPropsType) => {
  return (
    <label className={classNames.inputField}>
      <FormLabel label={label} />
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
