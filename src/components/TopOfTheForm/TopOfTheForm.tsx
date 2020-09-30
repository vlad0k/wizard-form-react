import React from "react";
import classNames from "./TopOfTheForm.module.css";
import TopTab from "../TopTab/TopTab";

const TopOfTheForm = () => {
  return (
    <div className={classNames.wrapper}>
      <TopTab value={1} name={"Account"} active />
      <TopTab value={2} name={"Profile"} />
      <TopTab value={3} name={"Contacts"} />
      <TopTab value={4} name={"Capabilities"} />
    </div>
  );
};

export default TopOfTheForm;
