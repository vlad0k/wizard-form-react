import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../ui/PageHeader';
import classNames from './index.module.css';

const PageLayout = ({
  name,
  children,
  backLink,
  backLabel,
  rightComponent,
}: PageLayoutPropType) => {
  return (
    <>
      <div className={classNames.topContainer}>
        <div className={classNames.linkWrapper}>
          {backLink && <Link to={backLink}>{`< ${backLabel}`}</Link>}
        </div>
        <div className={classNames.headerWrapper}>
          <PageHeader>{name}</PageHeader>
        </div>

        <div className={classNames.rightComponentWrapper}>{rightComponent}</div>
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
  rightComponent?: ReactNode;
};
