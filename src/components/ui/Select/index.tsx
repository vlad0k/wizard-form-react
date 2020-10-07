import React from "react";
import classNames from "./index.module.css";
import ReactSelect, { ValueType } from "react-select";
import { Field, FieldProps } from "formik";

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: "var(--form-label-color)",
    backgroundColor:
      state.isSelected || state.isFocused ? "var(--select-color)" : "white",
    paddingLeft: 8,
    fontSize: 14,
  }),
  // TODO fix select menu height
  menu: () => ({
    boxShadow: "none",
    height: 172,
    overflow: "scroll",
  }),
  control: () => ({
    border: "none",
    backgroundColor: "white",
    display: "block",
    width: 384,
    padding: "4px 8px",
    borderWidth: 1,
    borderColor: "var(--secondary-color)",
    borderStyle: "solid",
    fontWeight: 500,
  }),
  indicatorsContainer: () => ({
    display: "none",
  }),
  container: () => ({
    paddingBottom: 24,
  }),
  multiValue: () => ({
    backgroundColor: "var(--select-color)",
    fontSize: 12,
    color: "var(--action-text-color)",
    display: "flex",
    alignItems: "center",
    padding: 4,
    marginLeft: 4,
  }),
  multiValueLabel: () => ({
    color: "var(--action-text-color)",
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
              value={value}
              onChange={(
                selected: ValueType<{ value: string; label: string }>
              ) => setFieldValue(name, selected)}
              styles={customStyles}
              isMulti={isMulti}
            />
          );
        }}
      </Field>
    </>
  );
};

export default Select;
