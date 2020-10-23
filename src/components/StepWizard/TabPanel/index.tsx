import cn from 'classnames';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { NavTab } from 'react-router-tabs';

import classNames from './index.module.css';

const TabPanel: FC<TopTabProps> = ({
  name,
  disabled = false,
  value,
  isActive,
  onSelect = () => {},
}) => {
  const tabClassName = cn(classNames.tab, {
    [classNames.active]: isActive,
    [classNames.visited]: disabled,
  });

  return (
    <div onClick={onSelect} className={tabClassName}>
      {name}
    </div>
  );
};

export default TabPanel;

type TopTabProps = {
  name: string;
  disabled: boolean;
  value: string;
  isActive: boolean;
  onSelect: () => void;
};
