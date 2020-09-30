import React from "react";
import classNames from "./AccountForm.module.css";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Button from "../Button/Button";

interface Values {
  username: string;
  password: string;
  passwordRepeat: string;
}

const AccountForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordRepeat: "",
      }}
      onSubmit={(values) => console.log(values)}
    >
      <Form className={classNames.form}>
        <label>
          <span>User name</span>
          <Field name={"username"} id={"username"} />
        </label>
        <label>
          <span>Password</span>
          <Field name={"password"} id={"password"} />
        </label>
        <label>
          <span>Repeat Password</span>
          <Field name={"passwordRepeat"} id={"passwordRepeat"} />
        </label>
        <div className={classNames.button}>
          <Button>Forward</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default AccountForm;
