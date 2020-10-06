import React from "react";
import classNames from "./index.module.css";
import { Form, Formik, FieldArray, FieldArrayRenderProps } from "formik";
import InputField from "../../ui/form/InputField";
import Button from "../../ui/Button";
import addIcon from "../../../assets/icons/add.svg";
import minusIcon from "../../../assets/icons/minus.svg";
import { useDispatch } from "react-redux";
import { goBack } from "../../../redux/addFormReducer";
import Select from "../../ui/form/Select";

interface Values {
  company: string;
  facebook: string;
  github: string;
  mainLang: {
    value: string;
    label: string;
  } | null;
  fax: string;
  phoneNumbers: Array<string>;
}

const initialValues: Values = {
  company: "",
  facebook: "",
  github: "",
  mainLang: null,
  fax: "",
  phoneNumbers: [""],
};

const maxNumberOfPhoneInputs = 3;

const phoneInputs = (props: FieldArrayRenderProps) => {
  const {
    push,
    remove,
    form: {
      values: { phoneNumbers = [""] },
    },
  } = props;

  const phoneNumberFields = phoneNumbers.map((p: string, i: number) => (
    <div className={classNames.phones} key={i}>
      <InputField name={`phoneNumbers[${i}]`} label={`Phone #${i + 1}`} />
      {i > 0 && (
        <Button appearance="text" onClick={() => remove(i)}>
          <img src={minusIcon} alt="remove phone number input" />
        </Button>
      )}
    </div>
  ));

  return (
    <>
      {phoneNumberFields}

      {phoneNumbers.length < maxNumberOfPhoneInputs && (
        <Button appearance="text" onClick={() => push("")}>
          <img src={addIcon} alt="add phone number" />
          add phone number
        </Button>
      )}
    </>
  );
};

const Step3Form = () => {
  const dispatch = useDispatch();

  const backButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(goBack());
  };

  const submitForm = (values: Values) => {
    const {
      company,
      facebook,
      github,
      mainLang = { value: "" },
      fax,
      phoneNumbers,
    } = values;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitForm}>
      <Form className={classNames.form}>
        <div className={classNames.column}>
          <InputField name="company" label="Company" />
          <InputField name="github" label="GitHub Link" />
          <InputField name="facebook" label="Facebook Link" />
          <Select name="mainLang" />
        </div>

        <div className={classNames.column}>
          <InputField name="fax" label="Fax" />
          <FieldArray name="phoneNumbers">{phoneInputs}</FieldArray>

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
