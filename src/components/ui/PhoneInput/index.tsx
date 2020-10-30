import cn from 'classnames';
import { Field, FieldProps } from 'formik';
import React, { FC } from 'react';
import InputMask from 'react-input-mask';

import FieldError from '../FieldError';
import FormLabel from '../FormLabel';
import classNames from './index.module.css';

const PhoneInput: FC<PhoneInputPropsType> = ({ name, label, isRequiredField = false }) => {
  return (
    <div className={classNames.wrapper}>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const { name, onChange, onBlur, value } = field;
          const isError = form.errors[name] && form.touched[name];
          return (
            <>
              <div>
                <FormLabel label={label} isRequiredField={isRequiredField}>
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
                </FormLabel>
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
  isRequiredField?: boolean;
};
