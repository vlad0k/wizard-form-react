import React, { useState } from "react";
import SelectR, { ValueType } from "react-select";
import { Field, FieldProps } from "formik";

const options = [
  { value: "en", label: "English" },
  { value: "ru", label: "Russian" },
  { value: "ua", label: "Ukrainian" },
  { value: "uaj", label: "Ukrainian" },
  { value: "uajj", label: "Ukrainian" },
  { value: "ua", label: "Ukrainian" },
  { value: "ukla", label: "Ukrainian" },
  { value: "uklkj;a", label: "Ukrainian" },
  { value: "uj;a", label: "Ukrainian" },
  { value: "u;ka", label: "Ukrainian" },
];

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: "#657C9A",
    backgroundColor:
      state.isSelected || state.isFocused ? "var(--background-color)" : "white",
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
    backgroundColor: "var(--background-color)",
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

const Select = ({ name }: { name: string }) => {
  // const [selected, setSelected] = useState(null);
  return (
    <>
      <Field name={name}>
        {(props: FieldProps) => {
          const {
            field: { name, value },
            form: { setFieldValue },
          } = props;
          console.log(value);
          return (
            <SelectR
              options={options}
              value={value}
              onChange={(selected) => setFieldValue(name, selected.value)}
              styles={customStyles}
            />
          );
        }}
      </Field>
    </>
  );
};

export default Select;
