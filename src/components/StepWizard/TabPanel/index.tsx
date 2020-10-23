import cn from 'classnames';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { NavTab } from 'react-router-tabs';

import classNames from './index.module.css';

const TabPanel: FC<TopTabProps> = ({ active, name, disabled = false, editMode = false, to }) => {
  const { pathname } = useLocation();

  const tabClassName = cn(classNames.tab, {
    [classNames.active]: pathname.split('/').pop() === to,
    [classNames.visited]: editMode,
    [classNames.visited]: disabled && !editMode,
  });

  return (
    <NavTab to={to} className={tabClassName}>
      {name}
    </NavTab>
  );
};

export default TabPanel;

type TopTabProps = {
  name: string;
  active?: boolean;
  disabled: boolean;
  editMode?: boolean;
  to: string;
};
