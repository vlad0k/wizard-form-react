import React, { ReactNode } from "react";
import classNames from "./index.module.css";

const PageHeader = ({ children }: PageHeaderType) => {
  return <h1 className={classNames.header}>{children}</h1>;
};

export default PageHeader;

type PageHeaderType = {
  children: ReactNode;
};
