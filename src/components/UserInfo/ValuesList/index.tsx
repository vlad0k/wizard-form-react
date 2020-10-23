import React, { FC } from 'react';

import classNames from './index.module.css';

const ValuesList: FC<ValuesListPropsType> = ({ list }) => (
  <ul className={classNames.valuesList}>
    {list.map((listItem) => (
      <li key={listItem}>{listItem}</li>
    ))}
  </ul>
);

export default ValuesList;

type ValuesListPropsType = {
  list: string[];
};
