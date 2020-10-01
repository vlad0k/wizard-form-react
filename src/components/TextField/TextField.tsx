import React from "react";
import classNames from "./TextField.module.css";
import { ErrorMessage, Field } from "formik";

type TextFieldPropsType = {
  name: string;
  label: string;
  type?: string;
};

const TextField = ({ name, label, type }: TextFieldPropsType) => {
  return (
    <label className={classNames.textField}>
      <span>{label}</span>
      <Field name={name} id={name} type={type} />
      <div className={classNames.error}>
        <ErrorMessage name={name} />
      </div>
    </label>
  );
};

export default TextField;
