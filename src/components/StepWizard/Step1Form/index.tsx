import React from "react";
import classNames from "./index.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { accountFormForward } from "../../../redux/addFormReducer";

import Button from "../../ui/Button";
import InputField from "../../ui/form/InputField";

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

const Step1Form = () => {
  const dispatch = useDispatch();

  const formSubmit = ({ username, password }: Values) => {
    dispatch(accountFormForward(username, password));
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordRepeat: "",
      }}
      validationSchema={validateScema}
      onSubmit={formSubmit}
    >
      <Form className={classNames.form}>
        <InputField name="username" label="User Name" />
        <InputField name="password" label="Password" type="password" />
        <InputField
          name="passwordRepeat"
          label="Repeat Password"
          type="password"
        />
        <div className={classNames.button}>
          <Button>Forward</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default Step1Form;
