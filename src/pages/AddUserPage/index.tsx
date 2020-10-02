import React from "react";
import classNames from "./index.module.css";

import PageHeader from "../../components/ui/PageHeader";
import StepWizard from "../../components/StepWizard";

const Index = () => {
  return (
    <div className={classNames.addUserPage}>
      <PageHeader />
      <StepWizard />
    </div>
  );
};

export default Index;
