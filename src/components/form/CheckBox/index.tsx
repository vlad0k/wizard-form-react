import React from "react";
import classNames from "./index.module.css";
import { Field } from "formik";

type CheckboxPropsType = {
  name: string;
  label: string;
};

const Checkbox = ({ name, label }: CheckboxPropsType) => {
  return (
    <label className={classNames.wrapper} htmlFor={name}>
      <Field name={name} type={"checkbox"} id={name} />
      <div className={classNames.checkbox} />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
