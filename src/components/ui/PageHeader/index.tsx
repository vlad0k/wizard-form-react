import React, { ReactNode } from "react";
import classNames from "./index.module.css";

type PageHeaderType = {
  children: ReactNode;
};

const PageHeader = ({ children }: PageHeaderType) => {
  return <h1 className={classNames.header}>{children}</h1>;
};

export default PageHeader;
