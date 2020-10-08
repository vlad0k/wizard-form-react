import React, { ReactNode } from 'react';
import classNames from './index.module.css';
import PageHeader from '../ui/PageHeader';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import cn from 'classnames';

const PageLayout = ({ name, children, backLink, backLabel }: PageLayoutPropType) => {
  return (
    <>
      <div
        className={cn(classNames.topContainer, {
          [classNames.backLink]: backLink,
        })}
      >
        {backLink && (
          <Link to={backLink}>
            {'< '} {backLabel}
          </Link>
        )}
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
