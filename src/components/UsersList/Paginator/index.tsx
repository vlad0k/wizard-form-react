import React, { FC } from 'react';
import classNames from './index.module.css';
import cn from 'classnames';

const Paginator: FC<PaginatorPropsType> = ({ value, numberOfPages, selectPage = () => {} }) => {
  const pages = new Array(numberOfPages).fill(null).map((element, index) => index + 1);

  return (
    <div className={classNames.wrapper}>
      {pages.map((page) => (
        <div
          className={cn(classNames.page, {
            [classNames.active]: page === value,
          })}
          key={page}
          onClick={() => selectPage(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

type PaginatorPropsType = {
  value: number;
  numberOfPages: number;
  selectPage: (page: number) => void;
};

export default Paginator;
