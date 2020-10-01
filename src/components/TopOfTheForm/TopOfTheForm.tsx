import React from "react";
import classNames from "./TopOfTheForm.module.css";
import TopTab from "../TopTab/TopTab";

type TopOfTheFormPropsType = {
  value: number;
};

const TopOfTheForm = ({ value }: TopOfTheFormPropsType) => {
  return (
    <div className={classNames.wrapper}>
      <TopTab value={1} name={"Account"} active={value === 1} />
      <TopTab value={2} name={"Profile"} active={value === 2} />
      <TopTab value={3} name={"Contacts"} active={value === 3} />
      <TopTab value={4} name={"Capabilities"} active={value === 4} />
    </div>
  );
};

export default TopOfTheForm;
