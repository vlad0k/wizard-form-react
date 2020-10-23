import cn from 'classnames';
import React, { FC } from 'react';

import classNames from './index.module.css';

const Pagination: FC<PaginationPropsType> = ({
  currentPage,
  numberOfPages,
  selectPage = () => {},
}) => {
  const pages = new Array(numberOfPages).fill(null).map((element, index) => index + 1);

  return (
    <div className={classNames.wrapper}>
      {pages.map((page) => (
        <div
          className={cn(classNames.page, {
            [classNames.active]: page === currentPage,
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

type PaginationPropsType = {
  currentPage: number;
  numberOfPages: number;
  selectPage: (page: number) => void;
};

export default Pagination;
