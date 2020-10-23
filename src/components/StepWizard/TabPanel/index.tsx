import cn from 'classnames';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { NavTab } from 'react-router-tabs';

import classNames from './index.module.css';

const TabPanel: FC<TopTabProps> = ({ name, disabled = false, editMode = false, to }) => {
  const { pathname } = useLocation();
  const isActive = pathname.split('/').pop() === to;

  const tabClassName = cn(classNames.tab, {
    [classNames.active]: isActive,
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
  disabled: boolean;
  editMode?: boolean;
  to: string;
};
