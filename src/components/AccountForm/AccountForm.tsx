import React from "react";
import classNames from "./AccountForm.module.css";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";

interface Values {
  username: string;
  password: string;
  passwordRepeat: string;
}

const validateScema = Yup.object({
  username: Yup.string().required("required field"),
  password: Yup.string().required("required field"),
  passwordRepeat: Yup.string().oneOf(
    [Yup.ref("password"), ""],
    "passwords must match"
  ),
});

const AccountForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordRepeat: "",
      }}
      validationSchema={validateScema}
      onSubmit={(values) => console.log(values)}
    >
      <Form className={classNames.form}>
        <label>
          <span>User name</span>
          <Field name={"username"} id={"username"} />
          <div className={classNames.error}>
            <ErrorMessage name={"username"} />
          </div>
        </label>
        <label>
          <span>Password</span>
          <Field type={"password"} name={"password"} id={"password"} />
          <div className={classNames.error}>
            <ErrorMessage name={"password"} />
          </div>
        </label>
        <label>
          <span>Repeat Password</span>
          <Field
            type={"password"}
            name={"passwordRepeat"}
            id={"passwordRepeat"}
          />
          <div className={classNames.error}>
            <ErrorMessage name={"passwordRepeat"} />
          </div>
        </label>
        <div className={classNames.button}>
          <Button>Forward</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default AccountForm;
