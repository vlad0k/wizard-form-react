import React, { useState } from 'react';
import classNames from './index.module.css';
import ReactSelect, { OptionsType, ValueType } from 'react-select';
import { ErrorMessage, Field, FieldProps } from 'formik';

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
    width: 384,
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
  options?: OptionType[];
  label?: string;
};

const Select = ({ name, isMulti, options, label }: SelectPropsType) => {
  const [selectValue, setSelectValue] = useState<ValueType<OptionType>>(null);
  return (
    <>
      <span className={classNames.label}>{label}</span>
      <Field name={name}>
        {(props: FieldProps) => {
          const {
            field: { name, value },
            form: { setFieldValue },
          } = props;
          return (
            <ReactSelect
              options={options}
              value={selectValue}
              onChange={(selected: ValueType<OptionType>) => {
                let value: string | string[] = '';
                for (let i in selected) {
                  if ('value' in selected) {
                    value = selected.value;
                  } else if (Array.isArray(selected)) {
                    value = selected.map((s: OptionType) => s.value);
                  }
                }
                setFieldValue(name, value);
                setSelectValue(selected);
              }}
              styles={customStyles}
              isMulti={isMulti}
            />
          );
        }}
      </Field>
      <div className={classNames.error}>
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export default Select;
