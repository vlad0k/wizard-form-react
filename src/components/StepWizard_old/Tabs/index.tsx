import React from "react";
import classNames from "./index.module.css";
import TabPanel from "../TabPanel";

const Tabs = ({ value, tabs }: TabsPropsType) => (
  <div className={classNames.wrapper}>
    {tabs.map((tabName, i) => {
      const tabValue = i + 1;

      return (
        <TabPanel
          key={tabValue}
          name={tabName}
          value={tabValue}
          active={value === tabValue}
        />
      );
    })}
  </div>
);

export default Tabs;

type TabsPropsType = {
  value: number;
  tabs: string[];
};
