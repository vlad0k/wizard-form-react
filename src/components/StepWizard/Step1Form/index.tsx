import React from "react";
import classNames from "./index.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { accountFormForward } from "../../../redux/addFormReducer";

import Button from "../../ui/Button";
import TextField from "../../form/TextField";

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

const Index = () => {
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
        <TextField name={"username"} label={"User Name"} />
        <TextField name={"password"} label={"Password"} type={"password"} />
        <TextField
          name={"passwordRepeat"}
          label={"Repeat Password"}
          type={"password"}
        />
        <div className={classNames.button}>
          <Button submit>Forward</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default Index;
