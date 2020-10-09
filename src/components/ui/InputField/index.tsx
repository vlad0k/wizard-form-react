import React, { useState } from 'react';
import classNames from './index.module.css';
import { ErrorMessage, Field, FieldProps } from 'formik';
import Button from '../Button';
import visibilityIcon from '../../../assets/icons/icon-visibility.svg';
import visibilityOffIcon from '../../../assets/icons/icon-visibility-off.svg';
import FieldError from '../FieldError';

const InputField = ({ name, label, type = 'text' }: InputFieldPropsType) => {
  const [inputType, setInputType] = useState<string>(type);
  return (
    <label className={classNames.inputField}>
      <span>{label}</span>
      <div className={classNames.inputWrapper}>
        <Field name={name} id={name}>
          {({ field, form, meta }: FieldProps) => (
            <input
              {...field}
              type={inputType}
              className={meta.error ? classNames.errorField : classNames.noError}
            />
          )}
        </Field>
        {type === 'password' && (
          <Button
            appearance={'text'}
            onClick={() => setInputType((prev) => (prev === 'password' ? 'text' : 'password'))}
            type={'button'}
          >
            <img src={inputType === 'password' ? visibilityIcon : visibilityOffIcon} />
          </Button>
        )}
      </div>

      <FieldError name={name} />
    </label>
  );
};

export default InputField;

type InputFieldPropsType = {
  name: string;
  label: string;
  type?: 'text' | 'password' | 'email';
};
