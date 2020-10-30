import { Field, FieldProps } from 'formik';
import React, { FC } from 'react';

import FieldError from '../FieldError';
import FormLabel from '../FormLabel';
import classNames from './index.module.css';

const TextArea: FC<TextAreaPropsType> = ({ name, label, maxlength, isRequiredField = false }) => {
  return (
    <label className={classNames.inputField}>
      <FormLabel label={label} isRequiredField={isRequiredField}>
        <Field name={name} id={name}>
          {({ field }: FieldProps) => (
            <textarea className={classNames.textarea} {...field} maxLength={maxlength} />
          )}
        </Field>
      </FormLabel>
      <FieldError name={name} />
    </label>
  );
};

type TextAreaPropsType = {
  name: string;
  label: string;
  maxlength?: number;
  isRequiredField?: boolean;
};

export default TextArea;
