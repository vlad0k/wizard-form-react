import React from "react";
import classNames from "./ProfileForm.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../../form/TextField";
import Button from "../../ui/Button";

import { useDispatch } from "react-redux";
import { goBack, profileFormForward } from "../../../redux/addFormReducer";

interface Values {
  firstname: string;
  lastname: string;
  email: string;
  adress: string;
  gender: "male" | "female";
  birthdate: string;
}

const validateScema = Yup.object({
  firstname: Yup.string().required("required field"),
  lastname: Yup.string().required("required field"),
  email: Yup.string().required("required field"),
});

const ProfileForm = () => {
  const dispatch = useDispatch();

  const backButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(goBack());
  };

  const submitForm = (values: Values) => {
    const { firstname, lastname, email, adress, gender, birthdate } = values;
    dispatch(
      profileFormForward(adress, birthdate, email, firstname, gender, lastname)
    );
  };
  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        adress: "",
        gender: "male",
        birthdate: "",
      }}
      onSubmit={submitForm}
      validationSchema={validateScema}
    >
      <Form className={classNames.form}>
        <div className={classNames.column}>
          <TextField name={"firstname"} label={"First Name"} />
          <TextField name={"lastname"} label={"Last Name"} />
          <TextField name={"birthdate"} label={"Birth Date"} type={"date"} />
        </div>
        <div className={classNames.column}>
          <TextField name={"email"} label={"Email"} />
          <TextField name={"adress"} label={"Adress"} />
          <div className={classNames.radioGroup}>
            <label>
              <Field type={"radio"} name={"gender"} value={"male"} />
              <div className={classNames.radio} />
              Male
            </label>
            <label>
              <Field type={"radio"} name={"gender"} value={"female"} />
              <div className={classNames.radio} />
              Female
            </label>
          </div>

          <div className={classNames.buttons}>
            <Button type={"secondary"} onClick={backButtonClickHandler}>
              Back
            </Button>
            <Button submit={true}>Forward</Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default ProfileForm;
