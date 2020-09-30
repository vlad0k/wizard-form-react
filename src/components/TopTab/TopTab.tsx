import React from "react";
import classNames from "./TopTab.module.css";
import classNamesCombine from "classnames";

type TopTabProps = {
  value: number;
  name: string;
  active?: boolean;
};

const TopTab = ({ active, name, value }: TopTabProps) => {
  const tabClassName = classNamesCombine({
    [classNames.tab]: true,
    [classNames.active]: active,
  });

  return (
    <div className={tabClassName}>
      {value}. {name}
    </div>
  );
};

export default TopTab;
