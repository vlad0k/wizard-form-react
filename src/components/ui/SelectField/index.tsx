import React from 'react';
import classNames from './index.module.css';
import ReactSelect, { ValueType, OptionsType, OptionTypeBase } from 'react-select';
import { Field, FieldProps } from 'formik';
import FieldError from '../FieldError';

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: 'var(--form-label-color)',
    backgroundColor: state.isSelected || state.isFocused ? 'var(--select-color)' : 'white',
    paddingLeft: 8,
    fontSize: 14,
  }),
  control: () => ({
    border: 'none',
    backgroundColor: 'white',
    display: 'block',
    width: 284,
    padding: '4px 8px',
    borderWidth: 1,
    borderColor: 'var(--secondary-color)',
    borderStyle: 'solid',
    fontWeight: 500,
  }),
  indicatorsContainer: () => ({
    display: 'none',
  }),
  multiValue: () => ({
    backgroundColor: 'var(--select-color)',
    fontSize: 12,
    color: 'var(--action-text-color)',
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    marginLeft: 4,
  }),
  multiValueLabel: () => ({
    color: 'var(--action-text-color)',
  }),
};

// export type OptionType = {
//   value: string;
//   label: string;
// };

type SelectPropsType = {
  name: string;
  isMulti?: boolean;
  options: OptionsType<OptionTypeBase>;
  label?: string;
};

const SelectField = ({ name, isMulti, options, label }: SelectPropsType) => {
  return (
    <div className={classNames.wrapper}>
      <span className={classNames.label}>{label}</span>
      <Field name={name}>
        {({ field: { name, value }, form: { setFieldValue } }: FieldProps) => {
          const selectChangeHandler = (selected: ValueType<OptionTypeBase>) => {
            setFieldValue(name, selected);
          };

          return (
            <ReactSelect
              options={options}
              value={value}
              onChange={selectChangeHandler}
              styles={customStyles}
              isMulti={isMulti}
            />
          );
        }}
      </Field>
      <FieldError name={name} />
    </div>
  );
};

export default SelectField;
