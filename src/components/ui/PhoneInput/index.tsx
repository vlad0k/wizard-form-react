import React, { FC } from 'react';
import classNames from './index.module.css';
import InputMask from 'react-input-mask';
import { Field, FieldProps } from 'formik';
import FieldError from '../FieldError';
import cn from 'classnames';

const PhoneInput: FC<PhoneInputPropsType> = ({ name, label }) => {
  return (
    <div className={classNames.wrapper}>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const { name, onChange, onBlur, value } = field;
          const isError = form.errors[name] && form.touched[name];
          return (
            <>
              <span className={classNames.label}>{label}</span>
              <div>
                <InputMask
                  className={cn(classNames.input, {
                    [classNames.errorField]: isError,
                    [classNames.noError]: !isError,
                  })}
                  mask="+38 (999) 999 99 99"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  {(inputProps: InputMask) => <input {...inputProps} name={name} type="tel" />}
                </InputMask>
              </div>
              <FieldError name={name} />
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default PhoneInput;

type PhoneInputPropsType = {
  name: string;
  label?: string;
};
