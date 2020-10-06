import React, { ReactNode } from "react";
import PageHeader from "../ui/PageHeader";

const PageLayout = ({ name, children }: PageLayoutPropType) => {
  return (
    <>
      <PageHeader>{name}</PageHeader>
      {children}
    </>
  );
};

export default PageLayout;

type PageLayoutPropType = {
  name: string;
  children: ReactNode;
};
