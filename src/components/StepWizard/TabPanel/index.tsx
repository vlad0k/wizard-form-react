import cn from 'classnames';
import React, { FC } from 'react';
import { NavTab } from 'react-router-tabs';

import classNames from './index.module.css';

const TabPanel: FC<TopTabProps> = ({ name, disabled = false, isActive, onSelect = () => {} }) => {
  const tabClassName = cn(classNames.tab, {
    [classNames.active]: isActive,
    [classNames.visited]: disabled,
  });

  return (
    <NavTab to={'/add/account'} onClick={onSelect} className={tabClassName}>
      {name}
    </NavTab>
  );
};

export default TabPanel;

type TopTabProps = {
  name: string;
  disabled: boolean;
  isActive: boolean;
  onSelect?: () => void;
};
