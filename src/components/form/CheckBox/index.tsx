import React from "react";
import classNames from "./index.module.css";
import { Field, FieldProps } from "formik";

type CheckboxPropsType = {
  name: string;
  label: string;
};

const Checkbox = ({ name, label }: CheckboxPropsType) => {
  return (
    <label className={classNames.wrapper} htmlFor={name}>
      <Field name={name}>
        {(props: FieldProps) => {
          const {
            field,
            form: {
              values: { hobbies },
              setFieldValue,
            },
          } = props;
          return (
            <>
              <input
                id={name}
                type={"checkbox"}
                checked={hobbies.includes(field.name)}
                onChange={() => {
                  hobbies.includes(field.name)
                    ? setFieldValue(
                        "hobbies",
                        hobbies.filter((el: string) => el !== name)
                      )
                    : setFieldValue("hobbies", [...hobbies, name]);
                }}
              />
              <div className={classNames.checkbox} />
            </>
          );
        }}
      </Field>

      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
