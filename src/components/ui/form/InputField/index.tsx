import React from "react";
import classNames from "./index.module.css";
import { ErrorMessage, Field } from "formik";

const InputField = ({ name, label, type = "text" }: InputFieldPropsType) => {
  return (
    <label className={classNames.inputField}>
      <span>{label}</span>
      <Field name={name} id={name} type={type} />
      <div className={classNames.error}>
        <ErrorMessage name={name} />
      </div>
    </label>
  );
};

export default InputField;

type InputFieldPropsType = {
  name: string;
  label: string;
  type?: "text" | "password" | "email";
};
