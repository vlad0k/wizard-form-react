import React from "react";
import Tabs from "./Tabs";
import classNames from "./index.module.css";
import Avatar from "../ui/Avatar";
import FilePicker from "../ui/form/FilePicker";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/store";
import Step3Form from "./Step3Form";
import addIcon from "../../assets/icons/add.svg";

const Step1 = () => (
  <div className={classNames.twoColumns}>
    <div className={classNames.addUserPhoto}>
      <Avatar />
      <FilePicker name={"avatarupload"}>
        <img src={addIcon} alt="add avatar" />
        add avatar
      </FilePicker>
    </div>

    <div className={classNames.formWrapper}>
      <Step1Form />
    </div>
  </div>
);

const StepWizard = () => {
  let currentStep: number = useSelector(
    (state: StateType) => state.addForm.currentStep
  );

  return (
    <>
      <Tabs value={currentStep} />
      <div className={classNames.rectangle}>
        {[<Step1 />, <Step2Form />, <Step3Form />][currentStep - 1]}
      </div>
    </>
  );
};

export default StepWizard;
