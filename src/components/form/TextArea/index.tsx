import React from "react";
import classNames from "../InputField/index.module.css";
import { ErrorMessage, Field } from "formik";

type InputFieldPropsType = {
  name: string;
  label: string;
};

const TextArea = ({ name, label }: InputFieldPropsType) => {
  return (
    <label className={classNames.inputField}>
      <span>{label}</span>
      <Field name={name} id={name}>
        {({ field }: any) => <textarea {...field} />}
      </Field>
      <div className={classNames.error}>
        <ErrorMessage name={name} />
      </div>
    </label>
  );
};

export default TextArea;
