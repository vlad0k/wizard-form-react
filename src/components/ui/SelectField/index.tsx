import { Field, FieldProps } from 'formik';
import React, { FC } from 'react';
import ReactSelect, { OptionsType, OptionTypeBase, ValueType } from 'react-select';

import deleteIcon from '../../../assets/icons/Close.svg';
import { ButtonAppearance } from '../../../types';
import Button from '../Button';
import FieldError from '../FieldError';
import FormLabel from '../FormLabel';
import classNames from './index.module.css';

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
    padding: '6px 0',
    borderWidth: 1,
    borderColor: 'var(--secondary-color)',
    borderStyle: 'solid',
    fontWeight: 500,
    fontSize: 14,
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
  valueContainer: () => ({
    padding: '2px 4px ',
  }),
};

const SelectField: FC<SelectPropsType> = ({
  name,
  isMulti,
  options,
  label,
  isRequiredField = false,
}) => {
  return (
    <div className={classNames.wrapper}>
      <FormLabel label={label} isRequiredField={isRequiredField}>
        <Field name={name}>
          {({ field: { name, value }, form: { setFieldValue } }: FieldProps) => {
            const selectChangeHandler = (selected: ValueType<OptionTypeBase>) => {
              if (Array.isArray(selected)) {
                setFieldValue(
                  name,
                  selected.map(({ value }) => value),
                );
              } else if (selected && 'value' in selected) {
                setFieldValue(name, selected.value);
              }
            };

            const clearButtonHandler = () => {
              setFieldValue(name, []);
            };

            return (
              <div className={classNames.selectContainer}>
                <ReactSelect
                  options={options}
                  value={options.find((option) => option.value === value)}
                  onChange={selectChangeHandler}
                  styles={customStyles}
                  isMulti={isMulti}
                />
                {isMulti && value !== null && value.length > 0 && (
                  <div className={classNames.clearButton}>
                    <Button
                      onClick={clearButtonHandler}
                      appearance={ButtonAppearance.text}
                      type={'button'}
                    >
                      <img src={deleteIcon} alt={'remove all selected'} />
                    </Button>
                  </div>
                )}
              </div>
            );
          }}
        </Field>
      </FormLabel>
      <FieldError name={name} />
    </div>
  );
};

type SelectPropsType = {
  name: string;
  isMulti?: boolean;
  options: OptionsType<OptionTypeBase>;
  label?: string;
  isRequiredField?: boolean;
};

export default SelectField;
