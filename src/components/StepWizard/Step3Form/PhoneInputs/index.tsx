import React from "react";
import { FieldArrayRenderProps } from "formik";
import classNames from "../index.module.css";
import InputField from "../../../ui/InputField";
import Button from "../../../ui/Button";
import minusIcon from "../../../../assets/icons/minus.svg";
import addIcon from "../../../../assets/icons/add.svg";

const maxNumberOfPhoneInputs = 3;

const PhoneInputs = (props: FieldArrayRenderProps) => {
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
        <Button appearance="text" type={"button"} onClick={() => remove(i)}>
          <img src={minusIcon} alt="remove phone number input" />
        </Button>
      )}
    </div>
  ));

  return (
    <>
      {phoneNumberFields}

      {phoneNumbers.length < maxNumberOfPhoneInputs && (
        <Button appearance="text" type={"button"} onClick={() => push("")}>
          <img src={addIcon} alt="add phone number" />
          add phone number
        </Button>
      )}
    </>
  );
};

export default PhoneInputs;
