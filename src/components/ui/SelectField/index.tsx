import React from 'react';
import classNames from './index.module.css';
import ReactSelect, { ValueType } from 'react-select';
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
  // TODO fix select menu height
  menu: () => ({
    boxShadow: 'none',
    height: 172,
    overflow: 'scroll',
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
  container: () => ({
    paddingBottom: 24,
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

export type OptionType = {
  value: string;
  label: string;
};

type SelectPropsType = {
  name: string;
  isMulti?: boolean;
  options: OptionType[];
  label?: string;
};

const SelectField = ({ name, isMulti, options, label }: SelectPropsType) => {
  return (
    <>
      <span className={classNames.label}>{label}</span>
      <Field name={name}>
        {({ field: { name, value }, form: { setFieldValue } }: FieldProps) => {
          let selectValue: OptionType | OptionType[];
          if (!Array.isArray(value)) {
            selectValue = options.filter((option) => value === option.value)[0];
          } else {
            selectValue = options.filter((option) => value.includes(option.value));
          }

          const selectChangeHandler = (selected: ValueType<OptionType>) => {
            if (selected && 'value' in selected) {
              setFieldValue(name, selected.value);
            } else if (Array.isArray(selected)) {
              setFieldValue(
                name,
                selected.map((s: OptionType) => s.value),
              );
            }
          };

          return (
            <ReactSelect
              options={options}
              value={selectValue}
              onChange={selectChangeHandler}
              styles={customStyles}
              isMulti={isMulti}
            />
          );
        }}
      </Field>
      <FieldError name={name} />
    </>
  );
};

export default SelectField;
