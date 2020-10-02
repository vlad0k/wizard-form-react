import React from "react";
import classNames from "./index.module.css";

import Tabs from "../../components/StepWizard/Tabs";
import Avatar from "../../components/ui/Avatar";
import Step1Form from "../../components/StepWizard/Step1Form";
import { StateType } from "../../redux/store";
import Step2Form from "../../components/StepWizard/Step2Form";
import PageHeader from "../../components/ui/PageHeader";
import { useSelector } from "react-redux";
import FilePicker from "../../components/form/FilePicker";

const Index = () => {
  let currentStep: number = useSelector(
    (state: StateType) => state.addForm.currentStep
  );

  return (
    <div className={classNames.addUserPage}>
      <PageHeader />
      <Tabs value={currentStep} />

      {currentStep === 1 && (
        <div
          className={[classNames.rectangle, classNames.twoColumns].join(" ")}
        >
          <div className={classNames.addUserPhoto}>
            <Avatar />
            <FilePicker>+add avatar</FilePicker>
          </div>

          <div style={{ height: "100%" }}>
            <Step1Form />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className={classNames.rectangle}>
          <Step2Form />
        </div>
      )}
    </div>
  );
};

export default Index;
