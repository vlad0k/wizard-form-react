import { Field, FieldProps } from 'formik';
import React, { useState } from 'react';

import visibilityOffIcon from '../../../assets/icons/icon-visibility-off.svg';
import visibilityIcon from '../../../assets/icons/icon-visibility.svg';
import { ButtonAppearance } from '../../../types';
import Button from '../Button';
import FieldError from '../FieldError';
import FormLabel from '../FormLabel';
import classNames from './index.module.css';

const InputField = ({ name, label, type = 'text' }: InputFieldPropsType) => {
  const [inputType, setInputType] = useState<string>(type);
  const passwordVisibilityButtonHandler = () =>
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  return (
    <label className={classNames.inputField}>
      <FormLabel label={label} />
      <div className={classNames.inputWrapper}>
        <Field name={name} id={name}>
          {({ field, form }: FieldProps) => (
            <input
              {...field}
              type={inputType}
              className={
                form.errors[name] && form.touched[name] ? classNames.errorField : classNames.noError
              }
            />
          )}
        </Field>
        {type === 'password' && (
          <Button
            appearance={ButtonAppearance.text}
            onClick={passwordVisibilityButtonHandler}
            type="button"
          >
            <img src={inputType === 'password' ? visibilityIcon : visibilityOffIcon} alt="" />
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
