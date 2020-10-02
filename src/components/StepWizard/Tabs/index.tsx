import React from "react";
import classNames from "./index.module.css";
import TabPanel from "../TabPanel";

type TabsPropsType = {
  value: number;
};

const Tabs = ({ value }: TabsPropsType) => {
  const tabs = [
    "Account",
    "Profile",
    "Contacts",
    "Capabilities",
  ].map((tabName, i) => (
    <TabPanel
      key={tabName}
      value={i + 1}
      name={tabName}
      active={value === i + 1}
    />
  ));

  return <div className={classNames.wrapper}>{tabs}</div>;
};

export default Tabs;
