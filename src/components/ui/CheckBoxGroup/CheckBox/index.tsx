import React from 'react';
import classNames from './index.module.css';
import { Field, FieldProps } from 'formik';

type CheckboxPropsType = {
  name: string;
  label: string;
};

const Checkbox = ({ name, label }: CheckboxPropsType) => {
  return (
    <label className={classNames.wrapper} htmlFor={name}>
      <Field name={name}>
        {({
          field,
          form: {
            values: { hobbies },
            setFieldValue,
          },
        }: FieldProps) => {
          const changeHandler = () => {
            hobbies.includes(field.name)
              ? setFieldValue(
                  'hobbies',
                  hobbies.filter((el: string) => el !== name),
                )
              : setFieldValue('hobbies', [...hobbies, name]);
          };

          return (
            <>
              <input
                id={name}
                type={'checkbox'}
                checked={hobbies.includes(field.name)}
                onChange={changeHandler}
              />
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
