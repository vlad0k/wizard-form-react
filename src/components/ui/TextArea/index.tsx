import React from "react";
import classNames from "./index.module.css";
import { ErrorMessage, Field, FieldProps } from "formik";

type TextAreaPropsType = {
  name: string;
  label: string;
  maxlength?: number;
};

const TextArea = ({ name, label, maxlength }: TextAreaPropsType) => {
  return (
    <label className={classNames.inputField}>
      <span>{label}</span>
      <Field name={name} id={name}>
        {({ field }: FieldProps) => {
          return (
            <textarea
              className={classNames.textarea}
              {...field}
              maxLength={maxlength}
            />
          );
        }}
      </Field>
      <div className={classNames.error}>
        <ErrorMessage name={name} />
      </div>
    </label>
  );
};

export default TextArea;
