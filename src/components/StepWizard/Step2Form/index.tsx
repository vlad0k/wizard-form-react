import React from "react";
import classNames from "./index.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../ui/form/InputField";
import Button from "../../ui/Button";

import { useDispatch } from "react-redux";
import { goBack, step2FormForward } from "../../../redux/addFormReducer";
import DatePicker from "../../ui/form/DatePicker";

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

const Step2Form = () => {
  const dispatch = useDispatch();

  const backButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(goBack());
  };

  const submitForm = (values: Values) => {
    const { firstname, lastname, email, adress, gender, birthdate } = values;
    dispatch(
      step2FormForward(adress, birthdate, email, firstname, gender, lastname)
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
          <InputField name="firstname" label="First Name" />
          <InputField name="lastname" label="Last Name" />
          <DatePicker name="birthdate" />
        </div>
        <div className={classNames.column}>
          <InputField name="email" label="Email" />
          <InputField name="adress" label="Adress" />
          <div className={classNames.radioGroup}>
            <label>
              <Field type="radio" name="gender" value="male" />
              <div className={classNames.radio} />
              Male
            </label>
            <label>
              <Field type="radio" name="gender" value="female" />
              <div className={classNames.radio} />
              Female
            </label>
          </div>

          <div className={classNames.buttons}>
            <Button
              appearance="secondary"
              type="button"
              onClick={backButtonClickHandler}
            >
              Back
            </Button>
            <Button>Forward</Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Step2Form;
