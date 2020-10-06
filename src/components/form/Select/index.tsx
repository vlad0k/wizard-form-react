import React, { useState } from "react";
import classNames from "./index.module.css";
import SelectR, { ValueType } from "react-select";
import { Field, FieldProps } from "formik";

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: "#657C9A",
    backgroundColor: state.isSelected || state.isFocused ? "#E7F0FF" : "white",
    paddingLeft: 8,
    fontSize: 14,
  }),
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
    borderColor: "#C1CFE0",
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
    backgroundColor: "#E7F0FF",
    fontSize: 12,
    color: "#9BB0CB",
    display: "flex",
    alignItems: "center",
    padding: 4,
    marginLeft: 4,
  }),
  multiValueLabel: () => ({
    color: "#9BB0CB",
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
  const [selected, setSelected] = useState<ValueType<OptionType>>(null);
  return (
    <>
      <span className={classNames.label}>{label}</span>
      <Field name={name}>
        {(props: FieldProps) => {
          const {
            field: { name, value },
            form: { setFieldValue },
          } = props;

          const selectChangeHandler = (selected: any) => {
            !isMulti && setFieldValue(name, selected.value);
            isMulti &&
              selected &&
              setFieldValue(
                name,
                selected.map((el: OptionType) => el.value)
              );
            setSelected(selected);
            isMulti && !selected && setFieldValue(name, null);
          };

          return (
            <SelectR
              options={options}
              value={selected}
              onChange={selectChangeHandler}
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
