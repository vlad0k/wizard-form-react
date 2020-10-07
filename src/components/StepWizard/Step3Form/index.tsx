import React from "react";
import classNames from "./index.module.css";
import { Form, Formik, FieldArray } from "formik";
import InputField from "../../ui/InputField";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { goBack, step3FormSubmit } from "../../../redux/addFormReducer";
import Select, { OptionType } from "../../ui/Select";
import PhoneInputs from "./PhoneInputs";

interface Values {
  company: string;
  facebook: string;
  github: string;
  mainLang:
    | {
        value: string;
        label: string;
      }
    | { value: "" };
  fax: string;
  phoneNumbers: Array<string>;
}

const initialValues: Values = {
  company: "",
  facebook: "",
  github: "",
  mainLang: { value: "" },
  fax: "",
  phoneNumbers: [""],
};

const options: OptionType[] = [
  { value: "en", label: "English" },
  { value: "ru", label: "Russian" },
  { value: "ua", label: "Ukrainian" },
];

const Step3Form = () => {
  const dispatch = useDispatch();

  const backButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(goBack());
  };

  const submitForm = (values: Values) => {
    const { company, facebook, github, mainLang, fax, phoneNumbers } = values;
    const { value: mainLanguage = options[0].value } = mainLang;
    dispatch(
      step3FormSubmit(
        company,
        facebook,
        github,
        mainLanguage,
        fax,
        phoneNumbers
      )
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitForm}>
      <Form className={classNames.form}>
        <div className={classNames.column}>
          <InputField name="company" label="Company" />
          <InputField name="github" label="GitHub Link" />
          <InputField name="facebook" label="Facebook Link" />
          <Select name="mainLang" options={options} label="Main Language" />
        </div>

        <div className={classNames.column}>
          <InputField name="fax" label="Fax" />
          <FieldArray name="phoneNumbers">{PhoneInputs}</FieldArray>

          <div className={classNames.buttons}>
            <Button
              type="button"
              appearance="secondary"
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

export default Step3Form;
