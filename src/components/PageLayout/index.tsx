import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../ui/PageHeader';
import classNames from './index.module.css';

const PageLayout = ({ name, children, backLink, backLabel }: PageLayoutPropType) => {
  return (
    <>
      <div className={classNames.topContainer}>
        <div>{backLink && <Link to={backLink}>{`< ${backLabel}`}</Link>}</div>
        <PageHeader>{name}</PageHeader>
      </div>
      {children}
    </>
  );
};

export default PageLayout;

type PageLayoutPropType = {
  name: string;
  children: ReactNode;
  backLink?: string;
  backLabel?: string;
};
