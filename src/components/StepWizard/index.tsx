import React from "react";
import Tabs from "./Tabs";
import classNames from "./index.module.css";
import Avatar from "../ui/Avatar";
import FilePicker from "../form/FilePicker";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/store";

const StepWizard = () => {
  let currentStep: number = useSelector(
    (state: StateType) => state.addForm.currentStep
  );

  return (
    <>
      <Tabs value={currentStep} />
      <div className={classNames.rectangle}>
        {currentStep === 1 && (
          <div className={classNames.twoColumns}>
            <div className={classNames.addUserPhoto}>
              <Avatar />
              <FilePicker>+add avatar</FilePicker>
            </div>

            <div style={{ height: "100%" }}>
              <Step1Form />
            </div>
          </div>
        )}

        {currentStep === 2 && <Step2Form />}
      </div>
    </>
  );
};

export default StepWizard;
